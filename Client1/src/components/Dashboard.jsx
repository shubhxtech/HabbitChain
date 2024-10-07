import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from 'chart.js/auto';
import Button from "./Button";
import { addHabit, markHabitComplete, getHabits } from '../contractInteractions';

const Dashboard = ({ wallet, client, isConnected, connectWallet }) => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("daily");
  const [habitGoal, setHabitGoal] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(client)
  console.log(wallet)
  useEffect(() => {
    if (isConnected) {
      fetchHabits();
    } else {
      setLoading(false);
    }
  }, [isConnected, wallet, client]);

  const fetchHabits = async () => {
    if (wallet && client) {
      try {
        setLoading(true);
        const userAddress = await wallet.account();
        const userHabits = await getHabits(client, userAddress);
        setHabits(userHabits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const habitProgressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Habit Progress",
        data: habits.map(habit => habit.streak),
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    // ... (keep existing chartOptions)
  };

  const updateHabit = async (id) => {
    if (wallet && client) {
      try {
        await markHabitComplete(wallet, client, id);
        fetchHabits();
      } catch (error) {
        console.error("Error marking habit complete:", error);
      }
    }
  };

  const addNewHabit = async (e) => {
    e.preventDefault();
    if (wallet && client) {
      try {
        await addHabit(wallet, client, habitName, habitFrequency, habitGoal);
        setHabitName("");
        setHabitGoal("");
        fetchHabits();
      } catch (error) {
        console.error("Error adding habit:", error);
      }
    }
  };

  const filterProgress = (range) => {
    // Implement filtering logic based on blockchain data
    console.log(`Filter progress by: ${range}`);
  };

  if (!isConnected) {
    return (
      <div className="dashboard bg-n-8 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
          <p className="mb-4">Please connect your wallet to use the habit tracker.</p>
          <Button onClick={connectWallet} className="text-white bg-black px-6 py-3 rounded-md border border-white hover:bg-white hover:text-black transition-colors duration-300">
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="dashboard bg-n-8 min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading your habits...</p>
      </div>
    );
  }

  return (
    <div className="dashboard bg-n-8 min-h-screen">
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
          <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
          <form className="space-y-4" onSubmit={addNewHabit}>
            {/* ... (keep existing form fields) */}
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
                maintainAspectRatio: false,
                elements: {
                  line: {
                    tension: 0.4,
                    borderWidth: 2,
                  },
                  point: {
                    radius: 5,
                  },
                },
                plugins: {
                  legend: {
                    labels: {
                      color: 'black',
                    },
                  },
                },
              }}
              height={250}
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