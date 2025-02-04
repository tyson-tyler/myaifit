const steps_list: StepType[] = [
  {
    id: "BasicInfoCard",
    icon: "📝",
    title: "Personal Information 📝",
    description: "To get started, we need some basic information from you",
    component: null,
    answers: {
      name: "",
      age: 22,
      gender: "M",
      height: 175,
      weight: 70,
      body_type: "healthy",
      neck: 50,
      waist: 90,
      hip: 60,
      is_fat_accurate: null,
    },
  },
  {
    id: "FitGoal",
    icon: "🏃",
    title: "Fitness Goal 🏃",
    description: "What do you want to achieve on your new fitness journey",
    component: null,
    answers: {
      fitness_goal: "burn_fats",
      workout_days: 3,
      activity: "0",
    },
  },
];

export default steps_list;
