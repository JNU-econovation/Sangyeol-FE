import BrokenBornIcon from "@icons/BrokenBornIcon";
import ExhaustionIcon from "@icons/ExhaustionIcon";
import FrostbiteIcon from "@icons/FrostbiteIcon";
import HeadDamageIcon from "@icons/HeadDamageIcon";
import HeartIcon from "@icons/HeartIcon";
import ScratchIcon from "@icons/ScratchIcon";

export const SAFE_MANUAL_TITLES = [
  "신체 부상",
  "체온 및 대사 이상",
  "동물 및 자연환경 피해",
  "조난 및 고립",
] as const;

export const SAFE_MANUAL_CONTENTS = {
  "신체 부상": {
    title: "신체 부상",
    content: "외부 충격에 의한 일반적인 부상에 대한 응급조치",
    cases: [
      {
        symptom: "가슴 통증・호흡곤란 등 급성 질환",
        Icon: HeartIcon,
      },
      {
        symptom: "염좌 또는 골절",
        Icon: BrokenBornIcon,
      },
      {
        symptom: "찰과상",
        Icon: ScratchIcon,
      },
      {
        symptom: "머리 손상",
        Icon: HeadDamageIcon,
      },
      {
        symptom: "가슴 통증・호흡곤란 등 급성 질환",
        Icon: HeartIcon,
      },
      {
        symptom: "염좌 또는 골절",
        Icon: BrokenBornIcon,
      },
      {
        symptom: "찰과상",
        Icon: ScratchIcon,
      },
      {
        symptom: "머리 손상",
        Icon: HeadDamageIcon,
      },
    ],
  },
  "체온 및 대사 이상": {
    title: "체온 및 대사 이상",
    content: "체온 저하 또는 탈수 등 체내 이상 징후 대응법",
    cases: [
      {
        symptom: "저체온증",
        Icon: FrostbiteIcon,
      },
      {
        symptom: "탈진",
        Icon: ExhaustionIcon,
      },
    ],
  },
  "동물 및 자연환경 피해": {
    title: "동물 및 자연환경 피해",
    content: "야생동물과 외부 환경에 의한 부상 대응",
    cases: [
      {
        symptom: "가슴 통증・호흡곤란 등 급성 질환",
        Icon: HeartIcon,
      },
      {
        symptom: "염좌 또는 골절",
        Icon: BrokenBornIcon,
      },
      {
        symptom: "찰과상",
        Icon: ScratchIcon,
      },
      {
        symptom: "머리 손상",
        Icon: HeadDamageIcon,
      },
    ],
  },
  "조난 및 고립": {
    title: "조난 및 고립",
    content: "조난 및 고립 상황에서의 대처 방법",
    cases: [
      {
        symptom: "저체온증",
        Icon: FrostbiteIcon,
      },
      {
        symptom: "탈진",
        Icon: ExhaustionIcon,
      },
    ],
  },
} as const;
