import FirstTask from "@/modules/FirstTask/FirstTask";
import SecondTask from "@/modules/SecondTask/SecondTask";
import ThirdTask from "@/modules/ThirdTask/ThirdTask";

export default function Home() {
  return (
    <div className="about">
      <div className="center">Лабораторная работа №1. Бикбулатов Виталий Юрьевич. ПРО-204Б</div>
      <FirstTask/>
      <SecondTask/>
      <ThirdTask/>
    </div>
  );
}
