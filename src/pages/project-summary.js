import InnerPageContainer from "@/components/common/InnerPageContainer";

export default function Page() {
    return (
      <InnerPageContainer title="Project Summary">
        <p className="py-6">The authenticaton is done using worldcoin such that single address belongs to single person .</p>
        <p className="py-6">First step is to make able attestation on behalf borrowers that they have been selected for a particular hackathons or bootcamps or courses, etc... on EAS .</p> 
        <p className="py-6">The respective counterpatry would confirm the attestation .</p>
        <p className="py-6">Confirmation of the attestation would trigger a proposal to the DAO .</p>
        <p className="py-6">DAO would vote on the proposal based on the public profiles like twitter,github and past certificates .</p> 
        <p className="py-6">If the proposal is accepted, the counterparty would receive the funds and the borrower would be given a Soulboundtoken .</p>
        <p className="py-6">Along with the proposal, another attestation will be done on behalf of the borrower caliming that he has completed the course, the attestation has respective deadline attached to it .</p>
        <p className="py-6">The counterpatry would confirm the attestation on completion of the course .</p>
        <p className="py-6">The confirmation would trigger the burn of the soulbound token compeleting the cycle .</p>
        <p className="py-6">If the borrower did not show up for the hackathons or courses then the soulbound token would dynamically change based on deadline to defaulted .</p>
        <p className="py-6">This would prevent them from borrowing again and also leave them with a defaulted Soulboundtoken on thier worldcoin verified address thus incentivizing them to show-up .</p>
        <p className="py-6">They would be able to burn the Soulboundtoken for a penalty .</p>    
      </InnerPageContainer>
    )
  }
  