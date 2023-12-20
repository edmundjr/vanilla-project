import React, { useState } from "react";
import "./form.css"; // 

const Form = () => {
    const [task, setTask] = useState("");
    const [name, setName] = useState("");
    const [kavling, setKavling] = useState("");
    const [plants, setPlants] = useState("");
    const [date, setDate] = useState(new Date());
    const [flowers, setFlowers] = useState("");
    const [vanillaBeans, setVanillaBeans] = useState("");
    const [beanWeight, setBeanWeight] = useState("");
    const [numBranches, setNumBranches] = useState("");
    const [seedType, setSeedType] = useState("");
    const [seedCode, setSeedCode] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        task: task,
        name: name,
        section_name: kavling,
        plants: plants,
        date: date.toISOString(),
        flowers: task === "Pollination" ? flowers : undefined,
        vanilla_beans: task === "Harvest" ? vanillaBeans : undefined,
        bean_weight: task === "Harvest" ? beanWeight : undefined,
        num_branches: task === "Plant" ? numBranches : undefined,
        seed_type: task === "Plant" ? seedType : undefined,
        seed_code: task === "Plant" ? seedCode : undefined,
      };
  
      try {
        const response = await fetch("http://192.168.0.124:8000/activities/activities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          alert("Form submitted successfully!");
        } else {
          alert("Form submission failed.");
        }
      } catch (error) {
        console.error(error);
        alert("Form submission failed.");
      }
  
      setTask("");
      setName("");
      setKavling("");
      setPlants("");
      setDate(new Date());
      setFlowers("");
      setVanillaBeans("");
      setBeanWeight("");
      setNumBranches("");
      setSeedType("");
      setSeedCode("");
    };
  
    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1>Data Upload Form</h1>
        <div className="form-group">
          <label htmlFor="task">Task</label>
          <select
            id="task"
            name="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          >
            <option value="">Select a task...</option>
            <option value="Harvest">Harvest</option>
            <option value="Weed">Weed</option>
            <option value="Fertilize">Fertilize</option>
            <option value="Prune">Prune</option>
            <option value="Plant">Plant</option>
            <option value="Pollination">Pollination</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <select
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          >
            <option value="">Select a name...</option>
            <option value="John">John</option>
            <option value="Jane">Jane</option>
            <option value="Bob">Bob</option>
            <option value="Sue">Sue</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="kavling">Kavling</label>
          <select
            id="kavling"
            name="kavling"
            value={kavling}
            onChange={(e) => setKavling(e.target.value)}
            required
          >
            <option value="">Select a kavling...</option>
            <option value="Kavling 1">Kavling 1</option>
            <option value="Kavling 2">Kavling 2</option>
            <option value="Kavling 3">Kavling 3</option>
            <option value="Kavling 4">Kavling 4</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="plants">Plants</label>
          <input
            id="plants"
            name="plants"
            type="text"
            placeholder="e.g. 120-125, 127, 130-133"
            value={plants}
            onChange={(e) => setPlants(e.target.value)}
            required
          />
        </div>
        {task === "Pollination" && (
          <div className="form-group">
            <label htmlFor="flowers">Flowers Pollinated</label>
            <input
              id="flowers"
              name="flowers"
              type="text"
              placeholder="Plant1:5, Plant2:10, Plant3:8"
              value={flowers}
              onChange={(e) => setFlowers(e.target.value)}
              required
            />
          </div>
        )}
        {task === "Harvest" && (
          <>
            <div className="form-group">
              <label htmlFor="vanillaBeans">Vanilla Beans Collected</label>
              <input
                id="vanillaBeans"
                name="vanillaBeans"
                type="text"
                placeholder="Plant1:50, Plant2:30, Plant3:40"
                value={vanillaBeans}
                onChange={(e) => setVanillaBeans(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="beanWeight">Total Weight of Beans (kg)</label>
              <input
                id="beanWeight"
                name="beanWeight"
                type="text"
                placeholder="Plant1:0.502, Plant2:1.145, Plant3:0.033"
                value={beanWeight}
                onChange={(e) => setBeanWeight(e.target.value)}
                required
              />
            </div>
          </>
        )}
        {task === "Plant" && (
          <>
            <div className="form-group">
              <label htmlFor="numBranches">Number of Branches When Planting</label>
              <input
                id="numBranches"
                name="numBranches"
                type="number"
                min="0"
                placeholder="e.g. 5"
                value={numBranches}
                onChange={(e) => setNumBranches(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="seedType">Seed Type</label>
              <select
                id="seedType"
                name="seedType"
                value={seedType}
                onChange={(e) => setSeedType(e.target.value)}
                required
              >
                <option value="">Select seed type...</option>
                <option value="Local">Local</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="seedCode">Seed Code</label>
              <input
                id="seedCode"
                name="seedCode"
                type="text"
                placeholder="e.g. T080119"
                value={seedCode}
                onChange={(e) => setSeedCode(e.target.value)}
                required
              />
            </div>
          </>
        )} 
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setDate(new Date(e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      
    );
  };
  export default Form;
