// src/pages/admin/components/admin/UserDetail.jsx
"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, CreditCard, Activity, Globe } from "lucide-react"
import api from "../../../../utils/api"

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "CAD", name: "Canadian Dollar", symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "MXN", name: "Mexican Peso", symbol: "MX$" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr" },
  { code: "DKK", name: "Danish Krone", symbol: "kr" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "EGP", name: "Egyptian Pound", symbol: "E£" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨" },
  { code: "BDT", name: "Bangladeshi Taka", symbol: "৳" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫" },
  { code: "KRW", name: "South Korean Won", symbol: "₩" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽" },
  { code: "PLN", name: "Polish Zloty", symbol: "zł" },
  { code: "CZK", name: "Czech Koruna", symbol: "Kč" },
  { code: "HUF", name: "Hungarian Forint", symbol: "Ft" },
  { code: "RON", name: "Romanian Leu", symbol: "lei" },
  { code: "ILS", name: "Israeli New Shekel", symbol: "₪" },
  { code: "CLP", name: "Chilean Peso", symbol: "CLP$" },
  { code: "COP", name: "Colombian Peso", symbol: "COL$" },
  { code: "PEN", name: "Peruvian Sol", symbol: "S/." },
  { code: "ARS", name: "Argentine Peso", symbol: "ARS$" },
]

export default function UserDetail({ user, onBack }) {
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)

  useEffect(() => {
    if (user) {
      fetchUserDetails()
    }
  }, [user])

  const handleChangeCurrency = async (currency) => {
    try {
      const response = await api.post(`/admin/users/${user.id}/currency`, { currency })
      if (response.data.success) {
        alert(`Currency changed to ${currency} successfully!`)
        setShowCurrencyModal(false)
        fetchUserDetails()
      }
    } catch (error) {
      console.error('Failed to change currency:', error)
      alert(error.response?.data?.message || 'Failed to change currency')
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`/admin/users/${user.id}`)
      if (response.data.success) {
        setUserDetails(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch user details:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!userDetails) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Failed to load user details
      </div>
    )
  }

  const { user: userData, stats } = userDetails

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600">User Details</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Send Email
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
            Edit User
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'transactions', 'contacts', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <DollarSign size={20} className="text-green-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Balance</p>
                    <p className="text-lg font-bold text-gray-900">
                      {CURRENCIES.find(c => c.code === (userData.currency || "USD"))?.symbol || "$"}{userData.account_balance}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <Globe size={20} className="text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Currency</p>
                    <p className="text-lg font-bold text-gray-900">{userData.currency || "USD"}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <Activity size={20} className="text-blue-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Sent</p>
                    <p className="text-lg font-bold text-gray-900">${stats?.total_sent || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-purple-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Received</p>
                    <p className="text-lg font-bold text-gray-900">${stats?.total_received || 0}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center">
                  <Activity size={20} className="text-orange-600" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                    <p className="text-lg font-bold text-gray-900">{stats?.total_transactions || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Mail size={16} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Email</p>
                    <p className="text-gray-900">{userData.email}</p>
                  </div>
                </div>
                {userData.phone && (
                  <div className="flex items-center">
                    <Phone size={16} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone</p>
                      <p className="text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                )}
                {userData.address && (
                  <div className="flex items-center md:col-span-2">
                    <MapPin size={16} className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-600">Address</p>
                      <p className="text-gray-900">{userData.address}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar size={16} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Member Since</p>
                    <p className="text-gray-900">
                      {new Date(userData.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Activity size={16} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      userData.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {userData.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Credit Account
                </button>
                <button
                  onClick={() => setShowCurrencyModal(true)}
                  className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <Globe size={14} className="mr-2" />
                  Change Currency
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Send Message
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  View Transactions
                </button>
                <button className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userData.is_active
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}>
                  {userData.is_active ? 'Deactivate User' : 'Activate User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <p className="text-gray-500 text-center py-8">
            Transaction history will be displayed here
          </p>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">User Contacts</h3>
          <p className="text-gray-500 text-center py-8">
            Contact list will be displayed here
          </p>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">User Settings</h3>
          <p className="text-gray-500 text-center py-8">
            User settings and preferences will be displayed here
          </p>
        </div>
      )}

      {showCurrencyModal && (
        <ChangeCurrencyModal
          user={userData}
          onClose={() => setShowCurrencyModal(false)}
          onChangeCurrency={handleChangeCurrency}
        />
      )}
    </div>
  )
}

function ChangeCurrencyModal({ user, onClose, onChangeCurrency }) {
  const [selectedCurrency, setSelectedCurrency] = useState(user.currency || "USD")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const filteredCurrencies = CURRENCIES.filter(c =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedCurrency) return
    setLoading(true)
    await onChangeCurrency(selectedCurrency)
    setLoading(false)
  }

  const currentCurrency = CURRENCIES.find(c => c.code === (user.currency || "USD"))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] flex flex-col">
        <h3 className="text-lg font-semibold mb-2">Change User Currency</h3>
        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-700">
            Changing currency for: <strong>{user.name}</strong> ({user.email})
          </p>
          <p className="text-sm text-purple-700 mt-1">
            Current Currency: <strong>{currentCurrency ? `${currentCurrency.code} (${currentCurrency.symbol}) – ${currentCurrency.name}` : user.currency || "USD"}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search currency by code or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
            />
          </div>

          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg min-h-0" style={{ maxHeight: '300px' }}>
            {filteredCurrencies.map((currency) => (
              <label
                key={currency.code}
                className={`flex items-center px-4 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                  selectedCurrency === currency.code ? 'bg-purple-50' : ''
                }`}
              >
                <input
                  type="radio"
                  name="currency"
                  value={currency.code}
                  checked={selectedCurrency === currency.code}
                  onChange={() => setSelectedCurrency(currency.code)}
                  className="mr-3 accent-purple-600"
                />
                <span className="w-12 text-sm font-semibold text-gray-800">{currency.code}</span>
                <span className="w-8 text-sm text-gray-500 text-center">{currency.symbol}</span>
                <span className="text-sm text-gray-600 ml-2">{currency.name}</span>
              </label>
            ))}
            {filteredCurrencies.length === 0 && (
              <p className="text-center text-gray-500 text-sm py-6">No currencies found</p>
            )}
          </div>

          {selectedCurrency && (
            <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600 text-center">
              Selected: <strong>{selectedCurrency}</strong>
              {CURRENCIES.find(c => c.code === selectedCurrency) && (
                <> — {CURRENCIES.find(c => c.code === selectedCurrency).name} ({CURRENCIES.find(c => c.code === selectedCurrency).symbol})</>
              )}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedCurrency || selectedCurrency === (user.currency || "USD")}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Saving...' : 'Change Currency'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}