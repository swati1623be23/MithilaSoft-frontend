import React, { useEffect, useMemo, useState } from 'react'
import { Edit, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../../services/api'

const defaultEvents = [
    { id: 'received', event: 'Order Received', enabled: true, message: 'Hi $name, Your order $id has been received. Tracking: $track_url' },
    { id: 'processing', event: 'Order Processing', enabled: true, message: 'Hi $name, Your order $id is being processed. $store' },
    { id: 'dispatched', event: 'Order Dispatched', enabled: true, message: 'Hi $name, Your order $id has been dispatched. $store' },
    { id: 'today', event: 'Order Delivering Today', enabled: true, message: 'Hi $name, Your order $id will be delivered today. $store' },
    { id: 'delivered', event: 'Order Delivered', enabled: true, message: 'Hi $name, Your order $id has been delivered successfully.' },
]

const SMSMarketing = () => {
    const [activeTab, setActiveTab] = useState('events')
    const [loading, setLoading] = useState(true)
    const [credits, setCredits] = useState({ total: 50, used: 0, remaining: 50 })
    const [events, setEvents] = useState(defaultEvents)
    const [purchases, setPurchases] = useState([])
    const [usage, setUsage] = useState([])
    const [editingEvent, setEditingEvent] = useState(null)
    const [showPurchaseModal, setShowPurchaseModal] = useState(false)
    const [smsCount, setSmsCount] = useState(100)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [settingsResponse, purchasesResponse, logsResponse] = await Promise.all([
                    api.get('/sms/settings'),
                    api.get('/sms/purchases'),
                    api.get('/sms/logs'),
                ])
                const settings = settingsResponse.data?.settings
                const loadedEvents = settings?.events || []
                if (loadedEvents.length) setEvents(loadedEvents.map((item, index) => ({ ...item, id: item._id || item.id || `event-${index}` })))
                if (settingsResponse.data?.credits) setCredits(settingsResponse.data.credits)
                setPurchases(purchasesResponse.data?.purchases || [])
                setUsage(logsResponse.data?.logs || [])
            } catch {
                // Keep the screenshot-matched defaults available when the API has no SMS setup yet.
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    const toggleEvent = async (event) => {
        const nextEnabled = !event.enabled
        setEvents((current) => current.map((item) => item.id === event.id ? { ...item, enabled: nextEnabled } : item))
        if (event._id) {
            try {
                await api.put(`/sms/events/${event._id}`, { enabled: nextEnabled })
            } catch {
                setEvents((current) => current.map((item) => item.id === event.id ? { ...item, enabled: !nextEnabled } : item))
                toast.error('Unable to update event')
            }
        }
    }

    const saveEvent = async () => {
        if (!editingEvent) return
        setSaving(true)
        try {
            if (editingEvent._id) await api.put(`/sms/events/${editingEvent._id}`, { message: editingEvent.message })
            setEvents((current) => current.map((item) => item.id === editingEvent.id ? editingEvent : item))
            setEditingEvent(null)
            toast.success('Message updated')
        } catch {
            toast.error('Unable to update message')
        } finally {
            setSaving(false)
        }
    }

    const purchaseSMS = async (event) => {
        event.preventDefault()
        const count = Math.max(1, Number(smsCount) || 0)
        setSaving(true)
        try {
            const response = await api.post('/sms/purchase', { smsCount: count, amount: count * 10, paymentMethod: 'Fonepay' })
            if (response.data?.credits) setCredits(response.data.credits)
            if (response.data?.purchase) setPurchases((current) => [response.data.purchase, ...current])
            setShowPurchaseModal(false)
            toast.success(`${count} SMS credits purchased successfully`)
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to complete Fonepay purchase')
        } finally {
            setSaving(false)
        }
    }

    const remainingPercent = credits.total ? Math.min(100, Math.max(0, (credits.remaining / credits.total) * 100)) : 0
    const variables = [
        ['$id', 'is replaced with order number (#1011)'],
        ['$store', 'is replaced with store name'],
        ['$name', 'is replaced with customer first name'],
        ['$track_url', 'is replaced with order tracking link'],
        ['$amount', 'is replaced with total order value'],
    ]
    const tabs = [
        ['events', 'SMS & Events'],
        ['purchase', 'Purchase History'],
        ['usage', 'Usage History'],
    ]
    const visibleEvents = useMemo(() => events, [events])

    if (loading) return <div className="flex min-h-64 items-center justify-center text-gray-500 dark:text-gray-400">Loading SMS settings...</div>

    return (
        <div className="min-h-full bg-gray-50 p-4 text-gray-900 dark:bg-[#0f0f0f] dark:text-white sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
                <section className="flex flex-col items-center justify-center border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-black">
                    <div className="relative flex h-32 w-32 items-center justify-center rounded-full" style={{ background: `conic-gradient(#22c55e ${remainingPercent}%, #e5e7eb ${remainingPercent}% 100%)` }}>
                        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white dark:bg-black"><strong className="text-2xl">{credits.remaining}</strong><span className="text-xs text-gray-500 dark:text-gray-400">Messages Left</span></div>
                    </div>
                    <p className="mt-4 text-sm font-semibold">{credits.remaining} Messages Left</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Out of total {credits.total}</p>
                    <button type="button" onClick={() => setShowPurchaseModal(true)} className="mt-4 rounded border border-purple-600 bg-white px-4 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 dark:bg-black dark:text-purple-400">Purchase SMS</button>
                </section>

                <section className="border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-black">
                    <h2 className="border-b border-gray-200 pb-3 text-sm font-bold dark:border-gray-700">Message Variables Details</h2>
                    <div className="grid gap-x-8 gap-y-2 py-3 text-xs sm:grid-cols-2">{variables.map(([key, text]) => <div key={key} className="grid grid-cols-[76px_1fr] gap-2"><strong>{key}</strong><span className="text-gray-600 dark:text-gray-300">{text}</span></div>)}</div>
                    <p className="text-xs text-gray-600 dark:text-gray-300"><strong>Note:</strong> Variables only work on Event based automated SMS and won't work with Bulk SMS</p>
                </section>
            </div>

            <div className="mt-4 border-b border-gray-200 dark:border-gray-700">{tabs.map(([id, label]) => <button key={id} type="button" onClick={() => setActiveTab(id)} className={`px-4 py-2 text-xs font-semibold ${activeTab === id ? 'bg-gray-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}>{label}</button>)}</div>

            {activeTab === 'events' && <div className="mt-2 overflow-x-auto border border-gray-200 bg-white dark:border-gray-700 dark:bg-black"><table className="w-full min-w-[760px] text-xs"><thead className="bg-gray-50 dark:bg-[#171717]"><tr>{['Event', 'Enabled', 'Message', 'SMS Consumption', 'SMS Length', 'Actions'].map((heading) => <th key={heading} className="border-b border-gray-200 px-3 py-3 text-left font-bold dark:border-gray-700">{heading}</th>)}</tr></thead><tbody>{visibleEvents.map((event) => <tr key={event.id} className="border-b border-gray-200 dark:border-gray-700"><td className="px-3 py-3 font-semibold">{event.event}</td><td className="px-3 py-3"><button type="button" onClick={() => toggleEvent(event)} className={`relative h-5 w-8 rounded-full ${event.enabled ? 'bg-purple-600' : 'bg-gray-400'}`} aria-label={`Toggle ${event.event}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${event.enabled ? 'left-3.5' : 'left-0.5'}`} /></button></td><td className="max-w-md truncate px-3 py-3 text-gray-600 dark:text-gray-300">{event.message}</td><td className="px-3 py-3 text-center">{event.smsLength || 0}</td><td className="px-3 py-3 text-center">{Math.max(1, Math.ceil((event.message || '').length / 160))}</td><td className="px-3 py-3"><button type="button" onClick={() => setEditingEvent({ ...event })} className="text-purple-600 dark:text-purple-400" aria-label={`Edit ${event.event}`}><Edit className="h-4 w-4" /></button></td></tr>)}</tbody></table></div>}
            {activeTab === 'purchase' && <HistoryTable rows={purchases} empty="No purchase history found" columns={['SMS Credits', 'Amount', 'Payment', 'Status', 'Date']} renderRow={(row) => [row.smsCount, row.amount, row.paymentMethod, row.status, row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-']} />}
            {activeTab === 'usage' && <HistoryTable rows={usage} empty="No usage history found" columns={['Event', 'Message', 'Date']} renderRow={(row) => [row.event || row.type || 'SMS', row.message || '-', row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-']} />}

            {editingEvent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><form onSubmit={(event) => { event.preventDefault(); saveEvent() }} className="w-full max-w-lg border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-black"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Edit Message</h2><button type="button" onClick={() => setEditingEvent(null)} aria-label="Close"><X className="h-5 w-5" /></button></div><label className="mb-2 block text-sm font-semibold">{editingEvent.event}</label><textarea value={editingEvent.message} onChange={(event) => setEditingEvent({ ...editingEvent, message: event.target.value })} className="h-28 w-full rounded border border-gray-300 bg-white p-3 text-sm dark:border-gray-700 dark:bg-black" /><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setEditingEvent(null)} className="rounded border border-gray-300 px-4 py-2 text-sm dark:border-gray-700">Cancel</button><button type="submit" disabled={saving} className="rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white">{saving ? 'Saving...' : 'Save'}</button></div></form></div>}
            {showPurchaseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"><form onSubmit={purchaseSMS} className="w-full max-w-sm border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-black"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold">Purchase SMS</h2><button type="button" onClick={() => setShowPurchaseModal(false)} aria-label="Close"><X className="h-5 w-5" /></button></div><label className="mb-2 block text-sm font-semibold">SMS credits</label><input type="number" min="1" value={smsCount} onChange={(event) => setSmsCount(event.target.value)} className="w-full rounded border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-black" /><p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Payment method: Fonepay</p><button type="submit" disabled={saving} className="mt-5 w-full rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white">{saving ? 'Processing...' : 'Continue with Fonepay'}</button></form></div>}
        </div>
    )
}

const HistoryTable = ({ rows, columns, renderRow, empty }) => <div className="mt-2 overflow-x-auto border border-gray-200 bg-white dark:border-gray-700 dark:bg-black"><table className="w-full min-w-[600px] text-xs"><thead className="bg-gray-50 dark:bg-[#171717]"><tr>{columns.map((column) => <th key={column} className="border-b border-gray-200 px-3 py-3 text-left font-bold dark:border-gray-700">{column}</th>)}</tr></thead><tbody>{rows.length ? rows.map((row, index) => <tr key={row._id || index} className="border-b border-gray-200 dark:border-gray-700">{renderRow(row).map((value, valueIndex) => <td key={valueIndex} className="px-3 py-3">{value}</td>)}</tr>) : <tr><td colSpan={columns.length} className="px-3 py-8 text-center text-gray-500 dark:text-gray-400">{empty}</td></tr>}</tbody></table></div>

export default SMSMarketing
