import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

import AppRoutes from './routes';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;



// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebase";

// function App() {

//   const addStudent = async () => {
//     try {
//       const docRef = await addDoc(collection(db, "students"), {
//         name: "Prakash",
//         email: "prakash@gmail.com",
//         course: "Java"
//       });

//       console.log("Student added successfully!");
//       console.log("Document ID:", docRef.id);

//     } catch (error) {
//       console.error("Firestore Error:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Firebase Test</h1>

//       <button onClick={addStudent}>
//         Add Test Student
//       </button>
//     </div>
//   );
// }

// export default App;