import { useState } from 'react';
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaCalendarAlt,
  FaFileAlt,
  FaPrint,
  FaFileExport
} from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa6';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('');
  const [reportType, setReportType] = useState('sales');
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock report data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Sales ($)',
      data: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 3200, 4400, 2200, 5500, 4300],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const inventoryData = {
    labels: ['Electronics', 'Clothing', 'Groceries', 'Books', 'Toys'],
    datasets: [{
      label: 'Inventory Value ($)',
      data: [12000, 8000, 15000, 5000, 3000],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  };

  const purchaseData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Purchases ($)',
      data: [650, 590, 800, 810, 560, 550],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  // Generate report based on type and date range
  const generateReport = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      switch (reportType) {
        case 'sales':
          setReportData(salesData);
          break;
        case 'inventory':
          setReportData(inventoryData);
          break;
        case 'purchases':
          setReportData(purchaseData);
          break;
        default:
          setReportData(salesData);
      }
      setLoading(false);
    }, 1000);
  };

  // Date ranges for quick selection
  const dateRanges = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'This Month', value: 'thismonth' },
    { label: 'Last Month', value: 'lastmonth' },
    { label: 'This Year', value: 'thisyear' },
    { label: 'Custom Range', value: 'custom' }
  ];

  // Report types
  const reportTypes = [
    { value: 'sales', label: 'Sales Report' },
    { value: 'inventory', label: 'Inventory Report' },
    { value: 'purchases', label: 'Purchase Report' },
    { value: 'tax', label: 'Tax Report' },
    { value: 'profit', label: 'Profit & Loss' }
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading state */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Reports</h2>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                <FaFileAlt /> Generate Report
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <FaPrint /> Print
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                <FaFileExport /> Export
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-blue-600">Total Reports Generated</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">124</p>
            </div>
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-gray-500">Generating report...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Reports & Analytics</h2>
          <div className="flex space-x-3">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              onClick={generateReport}
            >
              <FaFileAlt />
              Generate Report
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => {/* Print report */}}
            >
              <FaPrint />
              Print
            </button>
            <button
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => {/* Export report */}}
            >
              <FaFileExport />
              Export
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              >
                <option value="">Select Date Range</option>
                {dateRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            >
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Report Display */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {reportTypes.find(t => t.value === reportType)?.label || 'Report'}
            </h3>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {/* Change chart type to bar */}}
              >
                Bar Chart
              </button>
              <button
                className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                onClick={() => {/* Change chart type to line */}}
              >
                Line Chart
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                onClick={() => {/* Change chart type to pie */}}
              >
                Pie Chart
              </button>
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="h-96 bg-gray-50 rounded-lg">
            {reportData ? (
              // In a real app, we would render a chart here using a library like Chart.js or Recharts
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-5xl text-indigo-500 mb-4">
                    <FaChartBar />
                  </div>
                  <p className="text-gray-600">Chart Visualization</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {reportType === 'sales' ? 'Monthly Sales Trend' :
                     reportType === 'inventory' ? 'Inventory Value by Category' :
                     'Purchase Trends'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select report type and date range, then click "Generate Report"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Reports</h3>
          <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
            View All Reports
          </a>
        </div>
        <div className="space-y-4">
          {/* Report items */}
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <div className="p-3 mr-4 bg-blue-50 rounded-full">
              <FaFileInvoiceDollar className="text-xl text-blue-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Monthly Sales Report</h4>
              <p className="text-sm text-gray-600">Generated on Jan 15, 2024</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                View
              </button>
              <button
                className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded"
              >
                Download
              </button>
            </div>
          </div>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <div className="p-3 mr-4 bg-green-50 rounded-full">
              <FaChartBar className="text-xl text-green-500" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">Inventory Summary</h4>
              <p className="text-sm text-gray-600">Generated on Jan 14, 2024</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded"
              >
                View
              </button>
              <button
                className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};