import Image from "next/image";
import { translateDate, translateNumber } from "@/utils/helpers";
import { PrintPad } from "./print-pad";

export function MemberForm({ member, nominee }) {
  return (
    <section className="text-lg leading-loose">
      <PrintPad label="ভর্তি ফর্ম প্রিন্ট করুন">
        <div className="hidden print:block">
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

            <div className="space-y-2">
              <div className="flex gap-12">
                {/* Member Picture */}
                <div className="space-y-1">
                  <figure className="relative w-24 h-28">
                    <Image
                      src={member?.memberImage}
                      alt={member?.name}
                      fill
                      className="object-cover"
                      loading="eager"
                    />
                  </figure>
                  <p className="text-center text-xs">সদস্যের ছবি</p>
                </div>
                {/* Nominee Picture */}
                <div className="space-y-1">
                  <figure className="relative w-24 h-28">
                    <Image
                      src={nominee?.nomineeImage}
                      alt={nominee?.nomineeName}
                      fill
                      className="object-cover"
                      loading="eager"
                    />
                  </figure>
                  <p className="text-center text-xs">নমিনীর ছবি</p>
                </div>
              </div>
              <div className="border border-primary p-2">
                <p>
                  সদস্য নম্বর: <b>{member?.memberNumber}</b>
                </p>
                <p>
                  ভর্তির তারিখ: <b>{translateDate(member?.createdAt)}</b>
                </p>
              </div>
            </div>
          </div>

          <p>
            আমি নিম্ন স্বাক্ষরকারী অত্র স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ
            কর্তৃক পরিচালিত সঞ্চয় প্রকল্প এর একজন সদস্য/সদস্যা হইতে ইচ্ছুক এই ন
            অঙ্গিকার করিতেছি যে আমি নিয়মিত ভাবে স্বপ্নতরী শ্রমজীবি সমবায় সমিতির
            দৈনিক/সাপ্তাহিক/মাসিক সঞ্চয় পরিশোধ করিয়া যাইব। যদি নিয়মিত সঞ্চয়
            পরিশোধে ব্যর্থ হই তাহা হইলে সঞ্চয়ের লভ্যাংশ কর্তন করার অধিকার
            স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ সংরক্ষণ করিবেন এবং আমি যদি
            স্বপ্নতরী শ্রমজীবি সমবায় সমিতি লিঃ এর কোন কর্মকর্তা/কর্মচারীদের সহিদ
            অসদআচরণ করি তাহা হইলে স্বপ্নতরী শ্রমজীবি সমবায় সমিতির। কার্যকরী
            পরিষদ প্রশাসনিক ভাবে যাহা সিদ্ধান্ত গ্রহন করিবেন তাহা মানিয়া লইতে
            বাধ্য থাকিবো।
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
              <div className="flex justify-between flex-wrap md:flex-nowrap">
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
              <div className="flex justify-between flex-wrap md:flex-nowrap">
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
            <p>বয়স: {translateNumber(member?.age)}</p>
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
              নমিনীর তথ্য
            </h2>
            <div className="grid md:grid-cols-2">
              <p>
                নমিনীর নাম: <b>{nominee?.nomineeName}</b>
              </p>
              <p>
                সম্পর্ক: <b>{nominee?.relationWithNominee}</b>
              </p>
              <p>
                জন্ম তারিখ: <b>{translateDate(nominee?.nomineeBirthDate)}</b>
              </p>
              <p>
                জাতীয় পরিচয় পত্র নম্বর: <b>{nominee?.nomineeNidNumber}</b>
              </p>
              <p>
                বয়স: <b>{translateNumber(nominee?.nomineeAge)}</b>
              </p>
              <p>
                পরিচয় দানকারীর নাম: <b>{member?.introducersName}</b>
              </p>
            </div>
            <section className="grid grid-cols-4 mt-16">
              <p className="overline decoration-dashed text-center">
                সভাপতির স্বাক্ষর
              </p>

              <p className="overline decoration-dashed text-center">
                সাধারণ সম্পাদকের স্বাক্ষর
              </p>

              <p className="overline decoration-dashed text-center">
                কোষাধ্যক্ষের স্বাক্ষর
              </p>

              <p className="overline decoration-dashed text-center">
                আবেদনকারীর স্বাক্ষর
              </p>
            </section>
          </div>
        </div>
      </PrintPad>
    </section>
  );
}
