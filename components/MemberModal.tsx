import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MemberResponse } from "./table/column";

const MemberModal = ({ member }: { member: MemberResponse }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl p-8">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Member Details: {member.firstName} {member.lastName}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Personal Information
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Registration Number:
                </strong>{" "}
                {member.regNumber || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Name:</strong>{" "}
                {member.firstName} {member.lastName}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Email:</strong>{" "}
                {member.email || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Phone:</strong>{" "}
                {member.phoneNumber || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Date of Birth:
                </strong>{" "}
                {member.dateOfBirth
                  ? new Date(member.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Gender:</strong>{" "}
                {member.gender || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Profile Picture:
                </strong>{" "}
                {member.profilePicture || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Address:</strong>{" "}
                {member.address
                  ? `${member.address.street || ""}, ${
                      member.address.city || ""
                    }, ${member.address.state || ""}, ${
                      member.address.country || ""
                    }`
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Emergency Contact:
                </strong>{" "}
                {member.emergencyContact
                  ? `${member.emergencyContact.fullName || ""} (${
                      member.emergencyContact.phoneNumber || ""
                    }, ${member.emergencyContact.relationship || ""})`
                  : "N/A"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Health Info:
                </strong>{" "}
                {member.healthInfo
                  ? `Height: ${member.healthInfo.height || "N/A"} cm, Weight: ${
                      member.healthInfo.weight || "N/A"
                    } kg, Conditions: ${
                      member.healthInfo.medicalConditions?.join(", ") || "None"
                    }, Allergies: ${
                      member.healthInfo.allergies?.join(", ") || "None"
                    }`
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Subscription Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Subscription Information
            </h3>
            {member.currentSubscription ? (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">Plan:</strong>{" "}
                  {member.currentSubscription.plan?.name || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Plan Type:
                  </strong>{" "}
                  {member.currentSubscription.plan?.planType || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Duration:
                  </strong>{" "}
                  {member.currentSubscription.plan?.duration || "N/A"} days
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">Price:</strong>{" "}
                  ₦{member.currentSubscription.plan?.price || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">Status:</strong>{" "}
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      member.currentSubscription.subscriptionStatus === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.currentSubscription.subscriptionStatus || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Start Date:
                  </strong>{" "}
                  {member.currentSubscription.startDate
                    ? new Date(
                        member.currentSubscription.startDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    End Date:
                  </strong>{" "}
                  {member.currentSubscription.endDate
                    ? new Date(
                        member.currentSubscription.endDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Auto Renew:
                  </strong>{" "}
                  {member.currentSubscription.autoRenew ? "Yes" : "No"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Payment Method:
                  </strong>{" "}
                  {member.currentSubscription.paymentMethod || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Payment Status:
                  </strong>{" "}
                  {member.currentSubscription.paymentStatus || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong className="font-medium text-gray-900">
                    Transaction Reference:
                  </strong>{" "}
                  {member.currentSubscription.transactionReference || "N/A"}
                </p>
              </div>
            ) : (
              <p className="text-gray-600 italic">No active subscription</p>
            )}
          </div>

          {/* Group Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">
              Group Information
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">Is Group:</strong>{" "}
                {member.isGroup ? "Yes" : "No"}
              </p>
              <p className="text-gray-700">
                <strong className="font-medium text-gray-900">
                  Group Role:
                </strong>{" "}
                {member.groupRole || "N/A"}
              </p>
              {member.groupSubscription ? (
                <>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-900">
                      Group Type:
                    </strong>{" "}
                    {member.groupSubscription.groupType || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-900">
                      Max Members:
                    </strong>{" "}
                    {member.groupSubscription.groupMaxMember || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-900">
                      Primary Member:
                    </strong>{" "}
                    {member.groupSubscription.primaryMember
                      ? `${member.groupSubscription.primaryMember.firstName} ${member.groupSubscription.primaryMember.lastName} (${member.groupSubscription.primaryMember.email})`
                      : "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong className="font-medium text-gray-900">
                      Dependant Members:
                    </strong>
                  </p>
                  {member.groupSubscription.dependantMembers?.length ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {member.groupSubscription.dependantMembers.map(
                        (dep, index) => (
                          <li key={index} className="text-gray-700">
                            {dep.member
                              ? `${dep.member.firstName} ${
                                  dep.member.lastName
                                } (${dep.member.email}, Status: ${
                                  dep.status
                                }, Joined: ${
                                  dep.joinedAt
                                    ? new Date(
                                        dep.joinedAt
                                      ).toLocaleDateString()
                                    : "N/A"
                                })`
                              : "N/A"}
                          </li>
                        )
                      )}
                    </ul>
                  ) : (
                    <p className="text-gray-600 italic">No dependants</p>
                  )}
                </>
              ) : (
                <p className="text-gray-600 italic">No group subscription</p>
              )}
            </div>
          </div>

          {/* Membership History */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-700 mb-4">
              Membership History
            </h3>
            {member.membershipHistory?.length ? (
              <ul className="list-disc pl-5 space-y-2">
                {member.membershipHistory.map((history, index) => (
                  <li key={index} className="text-gray-700">
                    <span className="font-medium">
                      Plan: {history.plan?.name || "N/A"} (
                      {history.plan?.planType || "N/A"},{" "}
                      {history.plan?.duration || "N/A"} days, ₦
                      {history.plan?.price || "N/A"})
                    </span>
                    <br />
                    Start:{" "}
                    {history.startDate
                      ? new Date(history.startDate).toLocaleDateString()
                      : "N/A"}
                    , End:{" "}
                    {history.endDate
                      ? new Date(history.endDate).toLocaleDateString()
                      : "N/A"}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 italic">No membership history</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MemberModal;
