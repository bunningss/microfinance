export function MemberForm({ member }) {
  return (
    <div className="bg-secondary p-2 rounded-md text-lg">
      <header className="pb-2 border-b border-green-700">
        <div className="flex justify-between items-center">
          <span>সঞ্চয়ই</span>
          <span className="text-green-700">বিসমিল্লাহির রাহমানির রাহিম</span>
          <span>সম্পদ</span>
        </div>
        {/* Company Information */}
        <div className=""></div>
      </header>
      <div className="border-t border-green-700 mt-1">
        {/* Header */}
        <div className="flex justify-between mt-2">
          <div>
            <p>বরাবর,</p>
            <p>সভাপতি</p>
            <p>স্বপ্নতরী শ্রমজীবী সমবায় সমিতি লিমিটেড</p>
            <p>১৭৭৮, মদীনাবাগ, কদমতলী, ঢাকা - ১৩৬২</p>
            <p className="font-bold">
              বিষয়: সঞ্চয় প্রকল্প এর সদস্য পদ লাভের জন্য আবেদন।
            </p>
            <p>জনাব,</p>
          </div>

          <div className="border border-primary p-2 h-fit">
            <p>সদস্য নং: {member?.nidNumber}</p>
            <p>ভর্তি তারিখ: {new Date(member?.createdAt).toDateString()}</p>
          </div>
        </div>

        <p>
          আমি নিম্ন স্বাক্ষরকারী অত্র স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ কর্তৃক
          পরিচালিত সঞ্চয় প্রকল্প এর একজন সদস্য/সদস্যা হইতে ইচ্ছুক এই ন অঙ্গিকার
          করিতেছি যে আমি নিয়মিত ভাবে স্বপ্নতরী শ্রমজীবি সমবায় সমিতির
          দৈনিক/সাপ্তাহিক/মাসিক সঞ্চয় পরিশোধ করিয়া যাইব। যদি নিয়মিত সঞ্চয়
          পরিশোধে ব্যর্থ হই তাহা হইলে সঞ্চয়ের লভ্যাংশ কর্তন করার অধিকার
          স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ সংরক্ষণ করিবেন এবং আমি যদি
          স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ এর কোন কর্মকর্তা/কর্মচারীদের সহিদ
          অসদআচরণ করি তাহা হইলে স্বপ্নতরী শ্রমজীবি সমবায় সমিতির। কার্যকরী পরিষদ
          প্রশাসনিক ভাবে যাহা সিদ্ধান্ত গ্রহন করিবেন তাহা মানিয়া লইতে বাধ্য
          থাকিবো।
        </p>

        <h2 className="text-center text-2xl my-4 p-2 border rounded-md">
          আবেদনকারীর তথ্য
        </h2>

        {/* Member details fields */}
        <div className="mt-2">
          <p>আবেদনকারীর নাম: {member?.name}</p>
          {member?.fathersName && <p>পিতার নাম: {member?.fathersName}</p>}
          {member?.husbandsName && <p>স্বামীর নাম: {member?.husbandsName}</p>}
          <p>মাতার নাম: {member?.mothersName}</p>

          {/* Permanent address */}
          <div className="mt-2">
            <span className="font-bold">বর্তমান ঠিকানা</span>
            <div className="flex gap-8 justify-between">
              <p>গ্রাম: {member?.permVillage}</p>
              <p>ডাকঘর: {member?.permPostOffice}</p>
              <p>থানা: {member?.permPoliceStation}</p>
              <p>জেলা: {member?.permDistrict}</p>
              <p>বাসার মোবাইল: {member?.homePhone}</p>
            </div>
          </div>

          {/* Present address */}
          <div className="my-2">
            <span className="font-bold">বর্তমান ঠিকানা</span>
            <div className="flex gap-8 justify-between">
              <p>গ্রাম: {member?.currVillage}</p>
              <p>ডাকঘর: {member?.currPostOffice}</p>
              <p>থানা: {member?.currPoliceStation}</p>
              <p>জেলা: {member?.currDistrict}</p>
              <p>নিজ মোবাইল: {member?.phone}</p>
            </div>
          </div>

          <p>জাতীয় পরিচয় পত্র নং: {member?.nidNumber}</p>
          <p>জাতীয়তা: {member?.nationality}</p>
          <p>জন্ম নিবন্ধন নং: {member?.birthCertificateNumber}</p>
          <p>বয়স: {member?.age}</p>
          <p>পেশা: {member?.occupation}</p>
          <p>ধর্ম: {member?.religion}</p>

          {/* Declaration */}
          <p className="mt-2">আবেদনকারীর ঘোষণা,</p>
          <p>
            আমি স্বেচ্ছায়, স্বজ্ঞানে, সুস্থ মস্তিস্কে সর্বোপরি স্বপ্নতরী
            শ্রমজীবি সমবায় সমিতি লি: এর আদর্শ ও উদ্দেশ্যের প্রতি আস্থা/বিশ্বাস
            স্থাপন করে আমার ভবিষ্যতের জন্য সঞ্চয়ের আবেদন করলাম আমি অত্র
            প্রতিষ্ঠানের গঠনতন্ত্র, বিধি-উপবিধি মেনে চলার অঙ্গিকার করছি।
          </p>

          <h2 className="text-center text-2xl my-4 p-2 border rounded-md">
            আবেদনকারীর নমিনীঃ
          </h2>
        </div>
      </div>
    </div>
  );
}
