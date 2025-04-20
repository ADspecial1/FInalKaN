

// import React, { useEffect, useState } from "react";
// import { Card, Spin } from "antd";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase/firebase";

// // Define some colors for the pie chart segments
// const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2"];

// const DealsPieChart: React.FC = () => {
//   const [data, setData] = useState<any[]>([]); // Data type should be flexible to handle dynamic fields
//   const [loading, setLoading] = useState(true);
//   const loggedInUserId = "RwlMNV4yh5VPFAhN4Jp0CUCuWlL2"; // Replace this with actual logged-in user ID

//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         // Array of collections to fetch from
//         const collections = [
//           "Backlog",
//           "To Do",
//           "In Progress",
//           "In Review",
//           "Done"
//         ];

//         const statusCounts: { [key: string]: number } = {
//           Backlog: 0,
//           "To Do": 0,
//           "In Progress": 0,
//           "In Review": 0,
//           Done: 0
//         };

//         // Loop through each collection and fetch the deals
//         for (const collectionName of collections) {
//           const q = query(
//             collection(db, collectionName),
//             where("userId", "==", loggedInUserId) // Filter by userId
//           );
//           const snapshot = await getDocs(q);

//           // Count the deals for this collection
//           snapshot.forEach(() => {
//             statusCounts[collectionName]++; // Increment the count for the collection
//           });
//         }

//         // Create the chart data based on collection counts
//         const chartData = [
//           { name: "Backlog", value: statusCounts.Backlog || 1, real: statusCounts.Backlog },
//           { name: "To Do", value: statusCounts["To Do"] || 1, real: statusCounts["To Do"] },
//           { name: "In Progress", value: statusCounts["In Progress"] || 1, real: statusCounts["In Progress"] },
//           { name: "In Review", value: statusCounts["In Review"] || 1, real: statusCounts["In Review"] },
//           { name: "Done", value: statusCounts.Done || 1, real: statusCounts.Done }
//         ];

//         // Set the data and stop loading
//         setData(chartData);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//         setLoading(false);
//       }
//     };

//     fetchDeals();
//   }, [loggedInUserId]); // Empty dependency array ensures this runs once when the component mounts

//   return (
//     <Card
//       title="Kanban Overview"
//       style={{
//         height: "100%",
//         borderRadius: "12px",
//         textAlign: "center",
//       }}
//     >
//       {loading ? (
//         <Spin tip="Loading chart..." />
//       ) : (
//         <ResponsiveContainer width="100%" height={400}>
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={130}
//               label={({ name, real }) => `${name} (${real})`} // Display name and deal count
//               isAnimationActive={true}
//             >
//               {data.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value, name, props) => `${props.payload.real} deal${props.payload.real !== 1 ? "s" : ""}`}
//             />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       )}
//     </Card>
//   );
// };

// export default DealsPieChart;
import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// Define some colors for the pie chart segments
const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"];

const DealsPieChart: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loggedInUserId = "RwlMNV4yh5VPFAhN4Jp0CUCuWlL2"; // Make sure this userId matches the one in Firestore documents

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const collections = ["Backlog", "To Do", "In Progress", "In Review", "Done"];
        const statusCounts: { [key: string]: number } = {
          Backlog: 0,
          "To Do": 0,
          "In Progress": 0,
          "In Review": 0,
          Done: 0,
        };

        for (const collectionName of collections) {
          const q = query(
            collection(db, collectionName),
            where("userId", "==", loggedInUserId)
          );
          const snapshot = await getDocs(q);
          statusCounts[collectionName] = snapshot.size;
        }

        const chartData = collections.map((name) => ({
          name,
          value: statusCounts[name],
          real: statusCounts[name],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, [loggedInUserId]);

  return (
    <Card
      title="Kanban Overview"
      style={{
        height: "100%",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      {loading ? (
        <Spin tip="Loading chart..." />
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, real }) => `${name} (${real})`}
              isAnimationActive={true}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) =>
                `${props.payload.real} deal${props.payload.real !== 1 ? "s" : ""}`
              }
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default DealsPieChart;
