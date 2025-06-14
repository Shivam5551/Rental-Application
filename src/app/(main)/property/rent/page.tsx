import { RentPropertyForm } from "@/components/RentPropertyForm";

export default function RentPropertyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              List Your Property for Rent
            </h1>
            <p className="text-gray-600">
              Create a listing for your property and start earning rental income
            </p>
          </div>
          
          <RentPropertyForm />
        </div>
      </div>
    </div>
  );
}
