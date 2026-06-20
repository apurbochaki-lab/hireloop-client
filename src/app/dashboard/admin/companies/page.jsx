import CompanyTable from "@/components/admin/CompanyTable";
import { getCompanies } from "@/lib/api/companies";

const AdminCompaniesPage = async () => {
    // Fetch data asynchronously inside the server runtime environment
    const companies = await getCompanies();

    return (
        <main className="min-h-screen bg-background text-foreground antialiased container mx-auto">
            <CompanyTable companies={companies} />
        </main>
    );
};

export default AdminCompaniesPage;