import { Card } from "@heroui/react";

export default function StatCard({ icon: Icon, title, value, subtitle, }) {
    return (
        <Card
            variant="default"
            className="
            mt-10
        h-full
        border
        border-default-100
        shadow-none
        transition-all
        duration-300
        hover:border-default-200
      "
        >
            <Card.Content className="p-6">
                <div
                    className="
            flex
            items-center
            justify-center
            size-12
            rounded-xl
            bg-default-100
          "
                >
                    {Icon && (
                        <div className="bg-[#353436] p-2 rounded-md">
                            <Icon className="size-6 text-default-600" />
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Card.Description className="text-sm font-semibold text-[#C4C7C8]">
                        {title}
                    </Card.Description>

                    <Card.Title className="mt-4 text-4xl font-semibold">
                        {value}
                    </Card.Title>

                    {subtitle && (
                        <p className="mt-2 text-xs text-default-400">
                            {subtitle}
                        </p>
                    )}
                </div>
            </Card.Content>
        </Card>
    );
}