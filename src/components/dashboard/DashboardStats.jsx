import StatCard from "./StatCard";

const DashboardStats = ({ statsData = [] }) => {
    return (
        <div
            className="
            
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
        >
            {statsData.map((item) => (
                <StatCard
                    key={item.id}
                    icon={item.icon}
                    title={item.title}
                    value={item.value}
                    subtitle={item.subtitle}
                />
            ))}
        </div>
    );
};

export default DashboardStats;