'use client';

import { FaInfoCircle, FaCheckCircle, FaTimesCircle, FaLightbulb } from 'react-icons/fa';

export default function ReviewGuidelines() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <FaInfoCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Review Guidelines
        </h3>
      </div>

      <div className="space-y-4">
        {/* What to Include */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FaCheckCircle className="w-4 h-4 text-green-600" />
            What to include in your review:
          </h4>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300 ml-6">
            <li>• Accuracy of property description</li>
            <li>• Cleanliness and condition</li>
            <li>• Host communication and responsiveness</li>
            <li>• Location and neighborhood</li>
            <li>• Value for money</li>
            <li>• Any standout features or amenities</li>
          </ul>
        </div>

        {/* What to Avoid */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <FaTimesCircle className="w-4 h-4 text-red-600" />
            Please avoid:
          </h4>
          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300 ml-6">
            <li>• Personal attacks or offensive language</li>
            <li>• Sharing personal information</li>
            <li>• Mentioning specific individuals by name</li>
            <li>• Discrimination or bias</li>
            <li>• Fake or misleading information</li>
          </ul>
        </div>

        {/* Tips */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <h4 className="font-medium text-orange-900 dark:text-orange-200 mb-2 flex items-center gap-2">
            <FaLightbulb className="w-4 h-4" />
            Tips for a helpful review:
          </h4>
          <ul className="space-y-1 text-sm text-orange-800 dark:text-orange-300">
            <li>• Be specific and detailed</li>
            <li>• Include both positives and areas for improvement</li>
            <li>• Consider what future guests would want to know</li>
            <li>• Be fair and balanced in your assessment</li>
          </ul>
        </div>

        {/* Review Policy */}
        <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-600 pt-3">
          <p>
            Reviews are moderated and may take up to 24 hours to appear. Reviews that violate our 
            community guidelines may be removed. By submitting a review, you agree to our{' '}
            <span className="text-orange-600 dark:text-orange-400 hover:underline cursor-pointer">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-orange-600 dark:text-orange-400 hover:underline cursor-pointer">
              Privacy Policy
            </span>.
          </p>
        </div>
      </div>
    </div>
  );
}
