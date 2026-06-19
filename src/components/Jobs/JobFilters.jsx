"use client";

import {
    InputGroup,
    TextField,
    Label,
    Select,
    Description,
    ListBox,
} from "@heroui/react";

import { Magnifier } from "@gravity-ui/icons";

const categories = [
    "design",
    "development",
    "marketing",
    "data",
    "sales",
];

const jobTypes = [
    "full-time",
    "part-time",
    "contract",
    "internship",
];

const workModes = [
    "remote",
    "onsite",
];

export default function JobFilters({
    searchTerm,
    setSearchTerm,

    selectedCategory,
    setSelectedCategory,

    selectedJobType,
    setSelectedJobType,

    selectedWorkMode,
    setSelectedWorkMode,
}) {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Search */}

            <TextField>
                <Label>Search</Label>

                <InputGroup>
                    <InputGroup.Prefix>
                        <Magnifier />
                    </InputGroup.Prefix>

                    <InputGroup.Input
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(e.target.value)
                        }
                        placeholder="Job title or company"
                    />
                </InputGroup>
            </TextField>

            {/* Category */}

            <Select
                selectedKey={selectedCategory}
                onSelectionChange={(key) =>
                    setSelectedCategory(key ? String(key) : "")
                }
            >
                <Label>Category</Label>

                <Select.Trigger>
                    <Select.Value placeholder="All Categories" />
                    <Select.Indicator />
                </Select.Trigger>

                <Description>
                    Filter by category
                </Description>

                <Select.Popover>
                    <ListBox>
                        {categories.map((category) => (
                            <ListBox.Item
                                key={category}
                                id={category}
                                textValue={category}
                            >
                                <Label className="capitalize">
                                    {category}
                                </Label>
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Job Type */}

            <Select
                selectedKey={selectedJobType}
                onSelectionChange={(key) =>
                    setSelectedJobType(key ? String(key) : "")
                }
            >
                <Label>Job Type</Label>

                <Select.Trigger>
                    <Select.Value placeholder="All Job Types" />
                    <Select.Indicator />
                </Select.Trigger>

                <Description>
                    Filter by job type
                </Description>

                <Select.Popover>
                    <ListBox>
                        {jobTypes.map((type) => (
                            <ListBox.Item
                                key={type}
                                id={type}
                                textValue={type}
                            >
                                <Label className="capitalize">
                                    {type}
                                </Label>
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>

            {/* Work Mode */}

            <Select
                selectedKey={selectedWorkMode}
                onSelectionChange={(key) =>
                    setSelectedWorkMode(key ? String(key) : "")
                }
            >
                <Label>Work Mode</Label>

                <Select.Trigger>
                    <Select.Value placeholder="All Jobs" />
                    <Select.Indicator />
                </Select.Trigger>

                <Description>
                    Remote or on-site
                </Description>

                <Select.Popover>
                    <ListBox>
                        {workModes.map((mode) => (
                            <ListBox.Item
                                key={mode}
                                id={mode}
                                textValue={mode}
                            >
                                <Label>
                                    {mode === "remote"
                                        ? "Remote"
                                        : "On-site"}
                                </Label>
                            </ListBox.Item>
                        ))}
                    </ListBox>
                </Select.Popover>
            </Select>
        </div>
    );
}