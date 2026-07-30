// components/rent/form-sections/AddressSection.tsx
import { IoLocationOutline, IoLocateOutline, IoCheckmarkCircle } from "react-icons/io5";
import { ICity } from "country-state-city";
import { SectionCard } from "@/components/ui/sectionCard";
import { SectionHeader } from "@/components/ui/sectionHeader";
import { FieldLabel } from "@/components/ui/fieldLabel";
import { SelectField } from "@/components/ui/selectField";
import { AddressAutocomplete } from "@/components/ui/addressAutoComplete";
import { GeoResult } from "@/utils/address";
import { PropertyFormData } from "@/types/property";

const inputCls = `
  w-full px-3 py-2.5 text-sm rounded-lg border 
  border-gray-300 dark:border-slate-700
  bg-white dark:bg-slate-800 
  text-gray-900 dark:text-slate-100 
  placeholder:text-gray-400 dark:placeholder:text-slate-500
  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent
  transition-colors
`.trim();

interface AddressSectionProps {
    formData: PropertyFormData;
    countries: { name: string; isoCode: string }[];
    stateNames: string[];
    cities: ICity[];
    postalCodeValid: boolean;
    postalCodeTouched: boolean;
    locating: boolean;
    onCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onStateChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onGeoSelect: (result: GeoResult) => void;
    onUseCurrentLocation: () => void;
    setPostalCodeTouched: (touched: boolean) => void;
}

export function AddressSection({
    formData,
    countries,
    stateNames,
    cities,
    postalCodeValid,
    postalCodeTouched,
    locating,
    onCountryChange,
    onStateChange,
    onInputChange,
    onGeoSelect,
    onUseCurrentLocation,
    setPostalCodeTouched,
}: AddressSectionProps) {
    return (
        <SectionCard>
            <SectionHeader
                icon={<IoLocationOutline size={18} />}
                title="Address & Location"
                subtitle="Search for the address — we'll fill in the rest"
            />

            <div className="space-y-4">
                <div className="flex items-start gap-2">
                    <div className="flex-1">
                        <FieldLabel label="Search Address" />
                        <AddressAutocomplete
                            initialValue={formData.address}
                            onSelect={onGeoSelect}
                            onManualChange={(val) => {
                                const e = {
                                    target: { name: "address", value: val },
                                } as React.ChangeEvent<HTMLInputElement>;
                                onInputChange(e);
                            }}
                        />
                    </div>
                    <div className="pt-6.5">
                        <button
                            type="button"
                            onClick={onUseCurrentLocation}
                            disabled={locating}
                            title="Use my current location"
                            className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-50 dark:hover:bg-slate-700 text-xs font-medium transition-colors disabled:opacity-50"
                        >
                            <IoLocateOutline
                                size={15}
                                className={locating ? "animate-pulse" : ""}
                            />
                            {locating ? "Locating…" : "Use current"}
                        </button>
                    </div>
                </div>

                <div>
                    <FieldLabel label="House / Street / Landmark" required htmlFor="address" />
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={onInputChange}
                        required
                        placeholder="e.g. Flat 4B, Sunrise Apartments, MG Road"
                        className={inputCls}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SelectField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={onCountryChange}
                        options={countries.map((c) => c.name)}
                        required
                    />
                    <SelectField
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={onStateChange}
                        options={stateNames}
                        required
                        disabled={stateNames.length === 0}
                        placeholder={stateNames.length === 0 ? "No states available" : undefined}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <FieldLabel label="City" required htmlFor="city" />
                        <input
                            id="city"
                            name="city"
                            list="city-options"
                            type="text"
                            value={formData.city}
                            onChange={onInputChange}
                            required
                            placeholder="e.g. Mumbai"
                            className={inputCls}
                        />
                        <datalist id="city-options">
                            {cities.map((c) => (
                                <option key={`${c.name}-${c.latitude}`} value={c.name} />
                            ))}
                        </datalist>
                    </div>

                    <div>
                        <FieldLabel label="Postal Code" required htmlFor="postalCode" />
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="text"
                            inputMode="numeric"
                            value={formData.postalCode}
                            onChange={onInputChange}
                            onBlur={() => setPostalCodeTouched(true)}
                            required
                            placeholder="e.g. 400001"
                            className={`${inputCls} ${
                                postalCodeTouched && formData.postalCode && !postalCodeValid
                                    ? "border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400"
                                    : ""
                            }`}
                        />
                        {postalCodeTouched && formData.postalCode && !postalCodeValid && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                Enter a valid postal code for {formData.country}
                            </p>
                        )}
                    </div>
                </div>

                {formData.latitude && formData.longitude && (
                    <p className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-1.5">
                        <IoCheckmarkCircle
                            className="text-green-600 dark:text-green-400"
                            size={13}
                        />
                        Coordinates locked: {formData.latitude.toFixed(5)},{" "}
                        {formData.longitude.toFixed(5)}
                    </p>
                )}
            </div>
        </SectionCard>
    );
}
