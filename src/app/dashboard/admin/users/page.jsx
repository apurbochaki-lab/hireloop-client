import UsersTable from "@/components/admin/UsersTable";
import { getUsersList } from "@/lib/api/users";

const AdminUsersPage = async () => {
    // Fetch data server-side
    const data = await getUsersList();

    // Fallback to empty array if data.users is undefined
    const users = data?.users || [];

    return (
        <div className="min-h-screen bg-[#000000] p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                        Total Users: <span className="text-default-400 ml-2">{users.length}</span>
                    </h2>
                </div>

                {/* Mount the interactive Client component */}
                <UsersTable users={users} />
            </div>
        </div>
    );
};

export default AdminUsersPage;