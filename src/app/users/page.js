"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Status ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setIsError(true);
      await Swal.fire({ icon: "warning", title: "ไม่สามารถโหลดข้อมูลได้" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id) => {
    // TODO: นำทางไปหน้าแก้ไข หรือเปิด modal แก้ไขข้อมูล
    console.log("edit user id:", id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ",
      text: "คุณต้องการลบสมาชิกคนนี้ใช่หรือไม่?",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      setUsers((prev) => prev.filter((user) => user.id !== id));
      await Swal.fire({ icon: "success", title: "ลบสำเร็จ" });
    } catch (error) {
      await Swal.fire({ icon: "error", title: "ลบไม่สำเร็จ" });
    }
  };

  if (isLoading) return <p>กำลังโหลดข้อมูล...</p>;
  if (isError) return <p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>;
  if (users.length === 0) return <p>ยังไม่มีข้อมูลสมาชิกในระบบ</p>;

  // Task 2: แสดงผลข้อมูลแบบตาราง (Desktop) + การ์ด (Mobile)
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">รายชื่อสมาชิก</h1>

      {/* ตาราง สำหรับจอกว้าง */}
      <table className="w-full border-collapse hidden md:table">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">ลำดับ</th>
            <th className="p-2 border">ชื่อ</th>
            <th className="p-2 border">นามสกุล</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border">{user.firstname}</td>
              <td className="p-2 border">{user.lastname}</td>
              <td className="p-2 border">{user.username}</td>
              <td className="p-2 border space-x-2">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="px-3 py-1 bg-yellow-400 rounded text-sm"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* การ์ด สำหรับมือถือ */}
      <div className="grid gap-3 md:hidden">
        {users.map((user, index) => (
          <div key={user.id} className="border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-500">ลำดับ {index + 1}</p>
            <p className="font-semibold">
              {user.firstname} {user.lastname}
            </p>
            <p className="text-sm text-gray-600">@{user.username}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(user.id)}
                className="flex-1 px-3 py-1 bg-yellow-400 rounded text-sm"
              >
                แก้ไข
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                ลบ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}