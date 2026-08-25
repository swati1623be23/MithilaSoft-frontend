// frontend/src/pages/dashboard/Transactions.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertCircle,
  Filter,
  Calendar,
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Zap
} from 'lucide-react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalTransactions: 0,
    totalAmount: 0,
    totalServiceCharge: 0,
    totalBlanxerFee: 0,
    netSettlement: 0
  });
  const [filters, setFilters] = useState({
    settlementVia: 'all',
    status: '',
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await axios.get(`/api/transactions?${queryParams}`);
      
      setTransactions(response.data.data || []);
      setSummary(response.data.summary || {
        totalTransactions: 0,
        totalAmount: 0,
        totalServiceCharge: 0,
        totalBlanxerFee: 0,
        netSettlement: 0
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transactions. Please try again.');
      setTransactions([]);
      setSummary({
        totalTransactions: 0,
        totalAmount: 0,
        totalServiceCharge: 0,
        totalBlanxerFee: 0,
        netSettlement: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettle = async (id) => {
    try {
      const identifier = prompt('Enter settlement identifier:');
      if (!identifier) return;

      await axios.put(`/api/transactions/${id}/settle`, { settlementIdentifier: identifier });
      fetchTransactions();
    } catch (error) {
      console.error('Error settling transaction:', error);
      alert('Failed to settle transaction');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);
  };

  const getStatusBadge = (status) => {
    const styles = {
      successful: 'bg-green-500/20 text-green-400 border-green-500/30',
      settled: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      failed: 'bg-red-500/20 text-red-400 border-red-500/30',
      refunded: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    };
    const icons = {
      successful: <CheckCircle className="w-3 h-3" />,
      settled: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
      refunded: <AlertCircle className="w-3 h-3" />
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${styles[status] || styles.pending}`}>
        {icons[status] || icons.pending}
        {status || 'Pending'}
      </span>
    );
  };

  const getSettlementBadge = (type) => {
    const styles = {
      blanxer: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      self: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      cash: 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${styles[type] || styles.self}`}>
        {type || 'Self'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-sans p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-gray-400 text-sm">
              Financial transaction log — payment records tied to orders.
              {summary?.totalBlanxerFee > 0 && (
                <span className="ml-2 text-indigo-400">
                  • Blanxer Fee: {formatCurrency(summary.totalBlanxerFee)} (3%)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={fetchTransactions}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#14141e] border border-gray-800 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select 
              value={filters.settlementVia}
              onChange={(e) => setFilters({...filters, settlementVia: e.target.value})}
              className="px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              <option value="all">All Settlements</option>
              <option value="blanxer">Blanxer Pay</option>
              <option value="self">Self</option>
              <option value="cash">Cash</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <span className="text-gray-600">to</span>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-3 py-2 bg-[#1a1a2e] border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          >
            <option value="">All Status</option>
            <option value="successful">Successful</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="settled">Settled</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#14141e] to-[#1a1a2e] border border-gray-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Transactions</span>
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-bold text-white">{summary?.totalTransactions || 0}</div>
          <div className="text-xs text-gray-500 mt-1">Total transactions processed</div>
        </div>
        
        <div className="bg-gradient-to-br from-[#14141e] to-[#1a1a2e] border border-gray-800 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Amount</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">{formatCurrency(summary?.totalAmount || 0)}</div>
          <div className="text-xs text-gray-500 mt-1">Gross transaction value</div>
        </div>
        
        <div className="bg-gradient-to-br from-[#14141e] to-[#1a1a2e] border border-gray-800 rounded-xl p-5 hover:border-amber-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Service Charge</span>
            <TrendingDown className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400">{formatCurrency(summary?.totalServiceCharge || 0)}</div>
          <div className="text-xs text-gray-500 mt-1">2% service fee</div>
        </div>
        
        <div className="bg-gradient-to-br from-[#14141e] to-[#1a1a2e] border border-gray-800 rounded-xl p-5 hover:border-blue-500/50 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Net Settlement</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-bold text-blue-400">{formatCurrency(summary?.netSettlement || 0)}</div>
          <div className="text-xs text-gray-500 mt-1">After fees & charges</div>
        </div>
      </div>

      {/* Blanxer Fee Notice */}
      {summary?.totalBlanxerFee > 0 && (
        <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <div>
            <span className="text-indigo-300 font-medium">Blanxer Pay Fee:</span>
            <span className="text-gray-300 ml-2">
              {formatCurrency(summary.totalBlanxerFee)} (3% of {formatCurrency(summary.totalAmount)})
            </span>
            <span className="text-gray-500 text-sm ml-2">
              • Flat 3% charge per transaction
            </span>
          </div>
        </div>
      )}

      {/* Transaction Table */}
      <div className="bg-[#14141e] border border-gray-800 rounded-xl overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-8 gap-2 bg-[#1a1a2e] px-5 py-3 border-b border-gray-800">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer & Order</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Settlement</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Fee</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-indigo-500 border-t-transparent"></div>
            <p className="text-gray-400 mt-3">Loading transactions...</p>
          </div>
        ) : error ? (
          <div className="py-16 text-center">
            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
            <p className="text-red-400 mb-3">{error}</p>
            <button onClick={fetchTransactions} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors">
              Retry
            </button>
          </div>
        ) : transactions.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-5xl mb-3">💳</div>
            <p className="text-gray-400">No transactions found</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className="grid grid-cols-8 gap-2 px-5 py-3 border-b border-gray-800/50 hover:bg-[#1a1a2e] transition-colors items-center">
              <div>
                <div className="font-medium text-white">{transaction.customer?.name || 'Unknown'}</div>
                <div className="text-xs text-gray-500">#{transaction.orderId?.orderNumber || 'N/A'}</div>
              </div>
              <div className="font-semibold text-white">{formatCurrency(transaction.amount)}</div>
              <div>{getSettlementBadge(transaction.settlementVia)}</div>
              <div className="text-sm text-gray-400">{transaction.paymentMethod || 'N/A'}</div>
              <div>{getStatusBadge(transaction.status)}</div>
              <div>
                {transaction.blanxerFee > 0 ? (
                  <span className="text-xs text-indigo-400">
                    {formatCurrency(transaction.blanxerFee)}
                    <span className="text-gray-600 block text-[10px]">3% fee</span>
                  </span>
                ) : (
                  <span className="text-xs text-gray-600">—</span>
                )}
              </div>
              <div className="text-sm text-gray-400">
                {transaction.transactionDate ? new Date(transaction.transactionDate).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }) : 'N/A'}
              </div>
              <div className="flex items-center justify-end gap-2">
                {transaction.settlementStatus !== 'settled' ? (
                  <button 
                    onClick={() => handleSettle(transaction._id)}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors text-xs"
                  >
                    Settle
                  </button>
                ) : (
                  <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Settled
                  </span>
                )}
                <button
                  onClick={() => setSelectedTransaction(transaction)}
                  className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedTransaction(null)}>
          <div className="bg-[#14141e] border border-gray-800 rounded-2xl max-w-2xl w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Transaction Details</h3>
              <button onClick={() => setSelectedTransaction(null)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 uppercase">Transaction ID</label>
                <p className="text-white font-mono text-sm">{selectedTransaction.transactionId}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Status</label>
                <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Amount</label>
                <p className="text-white font-bold text-lg">{formatCurrency(selectedTransaction.amount)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Net Amount</label>
                <p className="text-emerald-400 font-bold text-lg">{formatCurrency(selectedTransaction.netAmount)}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Customer</label>
                <p className="text-white">{selectedTransaction.customer?.name}</p>
                <p className="text-gray-400 text-sm">{selectedTransaction.customer?.email}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Payment Method</label>
                <p className="text-white">{selectedTransaction.paymentMethod}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Settlement Via</label>
                <p className="text-white">{selectedTransaction.settlementVia}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 uppercase">Date</label>
                <p className="text-white">{new Date(selectedTransaction.transactionDate).toLocaleString()}</p>
              </div>
            </div>
            {selectedTransaction.blanxerFee > 0 && (
              <div className="mt-4 p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                <span className="text-indigo-300 text-sm">Blanxer Fee (3%): </span>
                <span className="text-white font-medium">{formatCurrency(selectedTransaction.blanxerFee)}</span>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-gray-800 flex justify-end">
              <button onClick={() => setSelectedTransaction(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;