export function MemberForm({ member }) {
  return (
    <div className="bg-slate-50 p-2 rounded-md">
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
          <div className="flex flex-col">
            <span>বরাবর,</span>
            <span>সভাপতি</span>
            <span>স্বপ্নতরী শ্রমজীবী সমবায় সমিতি লিমিটেড</span>
            <span>১৭৭৮, মদীনাবাগ, কদমতলী, ঢাকা - ১৩৬২</span>
            <span className="font-bold">
              বিষয়: সঞ্চয় প্রকল্প এর সদস্য পদ লাভের জন্য আবেদন।
            </span>
            <span>জনাব,</span>
          </div>

          <div className="flex flex-col border border-primary p-2 h-fit">
            <span>সদস্য নং: {member?.nidNumber}</span>
            <span>
              ভর্তি তারিখ: {new Date(member?.createdAt).toDateString()}
            </span>
          </div>
        </div>

        <span>
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
        </span>

        <h2 className="text-center text-2xl my-4 p-2 border rounded-md">
          আবেদনকারীর তথ্য
        </h2>

        {/* Member details fields */}
        <div className="mt-2 flex flex-col">
          <span>আবেদনকারীর নাম: {member?.name}</span>
          <span>পিতা / স্বামীর নাম: {member?.fathersName}</span>
          <span>মাতার নাম: {member?.mothersName}</span>

          {/* Permanent address */}
          <div className="mt-2">
            <span className="font-bold">বর্তমান ঠিকানা</span>
            <div className="flex gap-8 flex-wrap">
              <span>গ্রাম: {member?.permVillage}</span>
              <span>ডাকঘর: {member?.permPostOffice}</span>
              <span>থানা: {member?.permPoliceStation}</span>
              <span>জেলা: {member?.permDistrict}</span>
              <span>বাসার মোবাইল: {member?.homePhone}</span>
            </div>
          </div>

          {/* Present address */}
          <div className="my-2">
            <span className="font-bold">বর্তমান ঠিকানা</span>
            <div className="flex gap-8 flex-wrap">
              <span>গ্রাম: {member?.currVillage}</span>
              <span>ডাকঘর: {member?.currPostOffice}</span>
              <span>থানা: {member?.currPoliceStation}</span>
              <span>জেলা: {member?.currDistrict}</span>
              <span>নিজ মোবাইল: {member?.phone}</span>
            </div>
          </div>

          <span>জাতীয় পরিচয় পত্র নং: {member?.nidNumber}</span>
          <span>জাতীয়তা: {member?.nationality}</span>
          <span>জন্ম নিবন্ধন নং: {member?.birthCertificateNumber}</span>
          <span>বয়স: {member?.age}</span>
          <span>পেশা: {member?.occupation}</span>
          <span>ধর্ম: {member?.religion}</span>

          {/* Declaration */}
          <span className="mt-2">আবেদনকারীর ঘোষণা,</span>
          <span>
            আমি স্বেচ্ছায়, স্বজ্ঞানে, সুস্থ মস্তিস্কে সর্বোপরি স্বপ্নতরী
            শ্রমজীবি সমবায় সমিতি লি: এর আদর্শ ও উদ্দেশ্যের প্রতি আস্থা/বিশ্বাস
            স্থাপন করে আমার ভবিষ্যতের জন্য সঞ্চয়ের আবেদন করলাম আমি অত্র
            প্রতিষ্ঠানের গঠনতন্ত্র, বিধি-উপবিধি মেনে চলার অঙ্গিকার করছি।
          </span>

          <h2 className="text-center text-2xl my-4 p-2 border rounded-md">
            আবেদনকারীর নমিনীঃ
          </h2>
        </div>
      </div>
    </div>
  );
}
