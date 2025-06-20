import React from "react";
import { BookOpen } from "lucide-react";
import { FaGraduationCap, FaUsers, FaChartLine, FaClock } from "react-icons/fa";
import GlassCard from "./GlassCard";
import "./../../styles/common/PlatformInfo.scss"; // Import SCSS styles

const PlatformInfo = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "การจัดการหลักสูตร",
      description: "จัดการและรวบรวมเนื้อหาการเรียนรู้อย่างมีประสิทธิภาพ",
    },
    {
      icon: <FaUsers />,
      title: "การเรียนรู้ร่วมกัน",
      description: "สนับสนุนการมีส่วนร่วมระหว่างผู้เรียน",
    },
    {
      icon: <FaChartLine />,
      title: "ติดตามความก้าวหน้า",
      description: "ติดตามผลการเรียนรู้และความสำเร็จ",
    },
    {
      icon: <FaClock />,
      title: "อัพเดทแบบเรียลไทม์",
      description: "รับการแจ้งเตือนและอัพเดทล่าสุดทันที",
    },
  ];

  return (
    <div className="platformContainer">
      <GlassCard className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 animate-float" />
          <h2 className="text-lg font-semibold text-white">
            แพลตฟอร์มการเรียนรู้ดิจิทัล
          </h2>
        </div>
        <p className="text-sm text-white/90 mb-4 leading-relaxed">
          การจัดการเรียนรู้เพื่อสร้างความเสมอภาคทางการศึกษา คณะศึกษาศาสตร์
          มหาวิทยาลัยเกษตรศาสตร์
        </p>
      </GlassCard>

      <div className="featuresGrid">
        {features.map((feature, index) => (
          <div key={index} className="featureCard">
            <div className="iconWrapper">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformInfo;