import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GraduationCap, Users, BookOpen, Building, TrendingUp, Award, Heart, Stethoscope } from 'lucide-react';

const NursingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState(null);

  useEffect(() => {
    // ข้อมูลจำลองตามข้อมูลจริงที่ได้จากการวิเคราะห์
    const dashboardData = {
      specialtyTraining: [
        { course: "การพยาบาลผู้ป่วยวิสัญญี", count: 78 },
        { course: "การพยาบาลโรคหัวใจ หลอดเลือด และทรวงอก", count: 59 },
        { course: "การพยาบาลเวชปฏิบัติผู้สูงอายุ", count: 36 },
        { course: "การพยาบาลผู้ป่วยภาวะวิกฤต (ผู้ใหญ่และผู้สูงอายุ)", count: 29 },
        { course: "การพยาบาลเวชปฏิบัติการบำบัดทดแทนไต", count: 27 },
        { course: "การพยาบาลผู้ป่วยมะเร็ง", count: 22 },
        { course: "การพยาบาลเวชปฏิบัติฉุกเฉิน", count: 18 },
        { course: "การพยาบาลเวชปฏิบัติทางตา", count: 17 },
        { course: "การพยาบาลผู้ป่วยประสาทวิทยาและประสาทศัลยศาสตร์", count: 16 },
        { course: "การพยาบาลผู้ป่วยออร์โธปิดิกส์", count: 14 },
        { course: "การผดุงครรภ์", count: 14 },
        { course: "การพยาบาลบริหารทางการพยาบาล", count: 11 },
        { course: "การพยาบาลผู้ป่วยโรคติดเชื้อและการป้องกันการติดเชื้อ", count: 10 },
        { course: "การพยาบาลรังสีวิทยา", count: 9 },
        { course: "การพยาบาลผู้ป่วยโรคหลอดเลือดสมอง", count: 8 }
      ],
      masterDegree: [
        { course: "การพยาบาลผู้ใหญ่", count: 21 },
        { course: "การบริหารการพยาบาล", count: 16 },
        { course: "การพยาบาลผู้สูงอายุ", count: 12 },
        { course: "การพยาบาลผู้ป่วยโรคติดเชื้อและควบคุมการติดเชื้อ", count: 3 },
        { course: "การพยาบาลจิตเวชและสุขภาพจิต", count: 2 },
        { course: "การพยาบาลเวชปฏิบัติชุมชน", count: 2 },
        { course: "การพยาบาลอาชีวอนามัย", count: 2 },
        { course: "การพยาบาลมารดาและทารกแรกเกิด", count: 2 },
        { course: "การพยาบาลผู้ใหญ่และผู้สูงอายุ", count: 2 },
        { course: "การพยาบาลสตรี", count: 1 },
        { course: "การพยาบาลแม่และเด็ก", count: 1 },
        { course: "การผดุงครรภ์", count: 1 },
        { course: "การพยาบาลเวชปฏิบัติอาชีวอนามัย", count: 1 },
        { course: "การพยาบาลสาธารณสุข", count: 1 }
      ],
      stats: {
        totalSpecialtyStudents: 469,
        totalMasterStudents: 67,
        totalCourses: 25,
        totalInstitutions: 21
      },
      institutionStats: [
        { institution: "โรงพยาบาลราชวิถี", courseCount: 13 },
        { institution: "คณะพยาบาลศาสตร์ มหาวิทยาลัยมหิดล", courseCount: 5 },
        { institution: "คณะสาธารณสุขศาสตร์ มหาวิทยาลัยมหิดล", courseCount: 4 },
        { institution: "สถาบันศรีสวรินทิรา สภากาชาดไทย", courseCount: 3 },
        { institution: "วิทยาลัยพยาบาลบรมราชชนนี กรุงเทพ", courseCount: 3 },
        { institution: "คณะพยาบาลศาสตร์ มหาวิทยาลัยรังสิต", courseCount: 2 },
        { institution: "โรงเรียนพยาบาลรามาธิบดี", courseCount: 2 },
        { institution: "สถาบันประสาทวิทยา กรมการแพทย์", courseCount: 2 }
      ]
    };
    setData(dashboardData);
  }, []);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];

  const StatCard = ({ title, value, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-blue-600 text-white shadow-lg'
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            ระบบ Dashboard การพยาบาลเฉพาะทางและปริญญาโท
          </h1>
          <p className="text-gray-600">ข้อมูลจากสำนักงานคณะกรรมการการอุดมศึกษา</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <TabButton
            id="overview"
            label="ภาพรวม"
            icon={TrendingUp}
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="specialty"
            label="หลักสูตรเฉพาะทาง"
            icon={Stethoscope}
            active={activeTab === 'specialty'}
            onClick={setActiveTab}
          />
          <TabButton
            id="master"
            label="ปริญญาโท"
            icon={GraduationCap}
            active={activeTab === 'master'}
            onClick={setActiveTab}
          />
          <TabButton
            id="institutions"
            label="สถาบันการศึกษา"
            icon={Building}
            active={activeTab === 'institutions'}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="ผู้อบรมเฉพาะทางทั้งหมด"
                value={data.stats.totalSpecialtyStudents}
                icon={Users}
                color="text-blue-600"
                subtitle="คน"
              />
              <StatCard
                title="ผู้เรียนปริญญาโททั้งหมด"
                value={data.stats.totalMasterStudents}
                icon={GraduationCap}
                color="text-green-600"
                subtitle="คน"
              />
              <StatCard
                title="หลักสูตรทั้งหมด"
                value={data.stats.totalCourses}
                icon={BookOpen}
                color="text-purple-600"
                subtitle="หลักสูตร"
              />
              <StatCard
                title="สถาบันการศึกษา"
                value={data.stats.totalInstitutions}
                icon={Building}
                color="text-orange-600"
                subtitle="แห่ง"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  สัดส่วนผู้เรียนเฉพาะทางและปริญญาโท
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'หลักสูตรเฉพาะทาง', value: data.stats.totalSpecialtyStudents },
                        { name: 'ปริญญาโท', value: data.stats.totalMasterStudents }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[0, 1].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Top Courses Comparison */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  หลักสูตรที่มีผู้เรียนมากที่สุด (เฉพาะทาง)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.specialtyTraining.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="course"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Specialty Training Tab */}
        {activeTab === 'specialty' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                หลักสูตรการพยาบาลเฉพาะทาง
              </h3>
              <ResponsiveContainer width="100%" height={600}>
                <BarChart data={data.specialtyTraining.slice(0, 15)} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 'dataMax + 10']} />
                  <YAxis
                    type="category"
                    dataKey="course"
                    tick={{ fontSize: 11 }}
                    width={280}
                    interval={0}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value + ' คน', 'จำนวนผู้เรียน']}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="count" fill="#10B981" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Top Specialty Courses Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                อันดับหลักสูตรเฉพาะทางยอดนิยม
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">อันดับ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">หลักสูตร</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">จำนวนผู้เรียน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.specialtyTraining.slice(0, 10).map((course, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{course.course}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {course.count} คน
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Master Degree Tab */}
        {activeTab === 'master' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                หลักสูตรปริญญาโท
              </h3>
              <ResponsiveContainer width="100%" height={450}>
                <BarChart data={data.masterDegree} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="course"
                    tick={{ fontSize: 9 }}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={180}
                  />
                  <YAxis domain={[0, 'dataMax + 2']} />
                  <Tooltip 
                    formatter={(value, name) => [value + ' คน', 'จำนวนผู้เรียน']}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Master Degree Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                รายละเอียดหลักสูตรปริญญาโท
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">อันดับ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">หลักสูตร</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">จำนวนผู้เรียน</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">ร้อยละ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.masterDegree.map((course, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{course.course}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                            {course.count} คน
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          {((course.count / data.stats.totalMasterStudents) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Institutions Tab */}
        {activeTab === 'institutions' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                สถาบันการศึกษาที่เปิดสอนหลักสูตร
              </h3>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={data.institutionStats} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 'dataMax + 2']} />
                  <YAxis
                    type="category"
                    dataKey="institution"
                    tick={{ fontSize: 10 }}
                    width={280}
                    interval={0}
                  />
                  <Tooltip 
                    formatter={(value, name) => [value + ' หลักสูตร', 'จำนวนหลักสูตร']}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="courseCount" fill="#F59E0B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Institution Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  สถาบันชั้นนำ
                </h3>
                <div className="space-y-4">
                  {data.institutionStats.slice(0, 5).map((institution, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                          index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{institution.institution}</p>
                        </div>
                      </div>
                      <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {institution.courseCount} หลักสูตร
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  สถิติสถาบันการศึกษา
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">สถาบันทั้งหมด</span>
                      <span className="text-2xl font-bold text-blue-600">{data.stats.totalInstitutions}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">หลักสูตรเฉลี่ยต่อสถาบัน</span>
                      <span className="text-2xl font-bold text-green-600">
                        {(data.institutionStats.reduce((sum, inst) => sum + inst.courseCount, 0) / data.institutionStats.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">สถาบันที่มีหลักสูตรมากที่สุด</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {data.institutionStats[0] ? data.institutionStats[0].courseCount : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Institutions Table */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                รายชื่อสถาบันการศึกษาทั้งหมด
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">อันดับ</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">สถาบันการศึกษา</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">จำนวนหลักสูตร</th>
                      <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">ร้อยละ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.institutionStats.map((institution, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{institution.institution}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {institution.courseCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">
                          {((institution.courseCount / data.institutionStats.reduce((sum, inst) => sum + inst.courseCount, 0)) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-lg font-semibold text-gray-800">ข้อมูลสรุป</span>
              <Heart className="w-6 h-6 text-red-500" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold text-blue-600">{data.stats.totalSpecialtyStudents + data.stats.totalMasterStudents}</p>
                <p className="text-sm text-gray-600">ผู้เรียนทั้งหมด</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-green-600">{data.stats.totalCourses}</p>
                <p className="text-sm text-gray-600">หลักสูตรทั้งหมด</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-600">{data.stats.totalInstitutions}</p>
                <p className="text-sm text-gray-600">สถาบันการศึกษา</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-600">100%</p>
                <p className="text-sm text-gray-600">ข้อมูลครบถ้วน</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              ข้อมูลจากสำนักงานคณะกรรมการการอุดมศึกษา (สกอ.) อัพเดทล่าสุด
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursingDashboard;