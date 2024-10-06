import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto';
import Button from "./Button";
// import Header from "./Header";

const Dashboard = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink Water", streak: 3, goal: "8 Glasses", completed: false },
    { id: 2, name: "Exercise", streak: 5, goal: "30 mins", completed: false },
    { id: 3, name: "Read", streak: 7, goal: "20 pages", completed: false },
  ]);

  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("daily");
  const [habitGoal, setHabitGoal] = useState("");

  const habitProgressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Habit Progress",
        data: [1, 0.5, 0.7, 0.9, 1, 1, 0.6], // Example data
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: { 
        beginAtZero: true,
        ticks: {
          color: 'gray',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'gray',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const updateHabit = (id) => {
    setHabits(habits.map((habit) =>
      habit.id === id ? { ...habit, completed: true, streak: habit.streak + 1 } : habit
    ));
  };

  const addHabit = (e) => {
    e.preventDefault();
    const newHabit = {
      id: habits.length + 1,
      name: habitName,
      streak: 0,
      goal: habitGoal,
      completed: false,
    };
    setHabits([...habits, newHabit]);
    setHabitName("");
    setHabitGoal("");
  };

  const filterProgress = (range) => {
    // Placeholder for filtering logic based on "week" or "month"
    console.log(`Filter progress by: ${range}`);
  };

  return (
    <div className="dashboard bg-n-8 min-h-screen">
      {/* Header */}
      {/* <Header /> */}
      <div className="container mx-auto px-4 py-24">
        {/* Overview Section */}
        <section className="overview-section bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Your Habit Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {habits.map((habit) => (
              <div key={habit.id} className="habit-card bg-white shadow-lg p-4 rounded-lg border border-black hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-black">{habit.name}</h3>
                <p className="text-black">Current Streak: <span className="font-bold">{habit.streak} days</span></p>
                <p className="text-black">Goal: <span className="font-bold">{habit.goal}</span></p>
                <Button className="mt-4 text-white bg-black px-6 py-3 rounded-md border border-white hover:bg-white hover:border-1 hover:text-black hover:border-black transition-all duration-300" onClick={() => updateHabit(habit.id)}>
                  Mark as Done
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Update or Add New Habit Section */}
        <section className="update-habit-section bg-white shadow-md p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Update or Add New Habit</h2>
          <form className="space-y-4" onSubmit={addHabit}>
            <div>
              <label htmlFor="habitName" className="block text-sm font-medium">Habit Name</label>
              <input
                type="text"
                id="habitName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="habitFrequency" className="block text-sm font-medium">Frequency</label>
              <select
                id="habitFrequency"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                value={habitFrequency}
                onChange={(e) => setHabitFrequency(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div>
              <label htmlFor="habitGoal" className="block text-sm font-medium">Goal</label>
              <input
                type="text"
                id="habitGoal"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="e.g. 30 minutes of exercise"
                value={habitGoal}
                onChange={(e) => setHabitGoal(e.target.value)}
                required
              />
            </div>
            <Button className="mt-4 text-white bg-black px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition-colors duration-300" type="submit">
              Save Habit
            </Button>
          </form>
        </section>

        {/* Progress Section */}
<section className="progress-section bg-white shadow-md p-6 rounded-lg mb-6">
  <h2 className="text-2xl font-bold mb-4">Habit Progress</h2>
  <div className="chart-container border border-gray-300 rounded-lg overflow-hidden shadow-lg">
    <Line
      data={habitProgressData}
      options={{
        ...chartOptions,
        maintainAspectRatio: false,  // Allows the chart to take the height of its container
        elements: {
          line: {
            tension: 0.4, // Smooth the line curves
            borderWidth: 2,
          },
          point: {
            radius: 5, // Adjust point size
          },
        },
        plugins: {
          legend: {
            labels: {
              color: 'black', // Change legend text color
            },
          },
        },
      }}
      height={250} // Set a fixed height for the chart
    />
  </div>
  <div className="filter-options mt-4">
    <Button className="mr-4 text-white bg-black px-4 py-2 rounded-md border border-gray-700 hover:bg-white hover:text-black hover:border-black transition-colors duration-300 shadow-sm" onClick={() => filterProgress("week")}>
      Last Week
    </Button>
    <Button className="text-white bg-black px-4 py-2 rounded-md border border-gray-700 hover:bg-white hover:text-black hover:border-black transition-colors duration-300 shadow-sm" onClick={() => filterProgress("month")}>
      Last Month
    </Button>
  </div>
</section>

      </div>
    </div>
  );
};

export default Dashboard;
