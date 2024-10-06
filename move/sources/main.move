module habit_list::habit {
    use std::string;
    use aptos_framework::account;
    use aptos_framework::signer;
    use std::vector;

    struct Habit has store, drop, copy {
        owner: address,
        habit: string::String,
        largest_streak: u64,
        current_streak: u64
    }

    struct HabitCollection has key {
        habits: vector<Habit>
    }

    public fun list_habit(owner: &signer, habit: string::String) acquires HabitCollection {
        let new_habit = Habit {
            owner: signer::address_of(owner),
            habit,
            largest_streak: 0,
            current_streak: 0
        };

        let owner_address = signer::address_of(owner);
        if (!exists<HabitCollection>(owner_address)) {
            let collection = HabitCollection {
                habits: vector::empty<Habit>(),
            };
            move_to(owner, collection);
        };

        let collection = borrow_global_mut<HabitCollection>(owner_address);
        vector::push_back(&mut collection.habits, new_habit);
    }

    public fun update_habit(owner: &signer, habit_index: u64) acquires HabitCollection {
        let owner_address = signer::address_of(owner);
        let collection = borrow_global_mut<HabitCollection>(owner_address);
        let habit = vector::borrow_mut(&mut collection.habits, habit_index);
        
        habit.current_streak = habit.current_streak + 1;
        if (habit.largest_streak < habit.current_streak) {
            habit.largest_streak = habit.current_streak;
        }
    }

    public fun get_all_habits(owner: address): vector<Habit> acquires HabitCollection {
        assert!(exists<HabitCollection>(owner), 0);
        let collection = borrow_global<HabitCollection>(owner);
        *&collection.habits
    }

    public fun initialize_for_test(owner: &signer) {
        if (!exists<HabitCollection>(signer::address_of(owner))) {
            move_to(owner, HabitCollection {
                habits: vector::empty<Habit>(),
            });
        }
    }
}
