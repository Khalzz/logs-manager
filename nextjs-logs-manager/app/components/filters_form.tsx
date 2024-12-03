"use client";

import { Type } from "@prisma/client";
import {
  Datepicker,
  Label,
  Select,
  ToggleSwitch,
  Button,
} from "flowbite-react";
import { SetStateAction, useEffect, useState } from "react";
import { Filter } from "../page";

interface FiltersProps {
  types: {
    id: number;
    name: string;
  }[];
  services: {
    service: string;
  }[];
  setFilter: (filters: Filter | undefined) => void;
}

const Filters: React.FC<FiltersProps> = ({ types, services, setFilter }) => {
  const [activeFrom, setActiveFrom] = useState(false);
  const [activeTo, setActiveTo] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState<Date | undefined>();
  const [selectedTo, setSelectedTo] = useState<Date | undefined>();
  const [selectedType, setSelectedType] = useState<number | undefined>();
  const [selectedService, setSelectedService] = useState<string | undefined>();

  useEffect(() => {
    if (!activeFrom) {
      setSelectedFrom(undefined);
    }

    if (!activeTo) {
      setSelectedTo(undefined);
    }

    setFilter({
      typeId: selectedType,
      service: selectedService,
      from: selectedFrom,
      to: selectedTo,
    });
  }, [selectedService, selectedType, selectedFrom, selectedTo]);

  const typeList = types.map((type) => {
    const color =
      type.name === "ERROR"
        ? "text-red-500"
        : type.name === "INFO"
          ? "text-green-500"
          : type.name === "WARNING"
            ? "text-yellow-500"
            : "";

    return (
      <option className={color} key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  });

  const serviceList = services.map((service) => {
    return (
      <option key={service.service} value={service.service}>
        {service.service}
      </option>
    );
  });

  const handleFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value); // Convert string to Date
    console.log("fechastica" + date);
    setSelectedFrom(date);
  };

  const handleToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value); // Convert string to Date
    setSelectedTo(date);
  };

  // Function to reset all filters
  const resetFilters = () => {
    setActiveFrom(false);
    setActiveTo(false);
    setSelectedType(undefined);
    setSelectedService(undefined);
  };

  return (
    <div className="grid w-full grid-cols-1 items-start gap-4 px-5 pb-10 md:grid-cols-2">
      {/* date (from-to) selectors */}
      <div className="mr-10 flex w-full flex-col gap-4">
        <div className="w-full gap-2">
          <Label htmlFor="From" value="From" />
          <div className="flex max-w-md flex-row content-center gap-4">
            <Datepicker disabled={!activeFrom} onChange={handleFromChange} />
            <ToggleSwitch checked={activeFrom} onChange={setActiveFrom} />
          </div>
        </div>
        <div className="w-full gap-2">
          <Label htmlFor="To" value="To" />
          <div className="flex max-w-md flex-row content-center gap-4">
            <Datepicker disabled={!activeTo} onChange={handleToChange} />
            <ToggleSwitch checked={activeTo} onChange={setActiveTo} />
          </div>
        </div>
      </div>

      {/* type and service selectors */}
      <div className="flex flex-col gap-4">
        <div className="gap-2">
          <Label htmlFor="type" value="type" />
          <Select
            id="type"
            value={selectedType}
            onChange={(e) => setSelectedType(parseInt(e.target.value))}
          >
            <option value={undefined}>ALL</option>
            {typeList}
          </Select>
        </div>
        <div className="gap-2">
          <Label htmlFor="service" value="service" />
          <Select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value={""}>ALL</option>
            {serviceList}
          </Select>
        </div>
      </div>

      {/* Reset Button */}
      <div className="col-span-full mt-4">
        <Button onClick={resetFilters} color="gray">
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;