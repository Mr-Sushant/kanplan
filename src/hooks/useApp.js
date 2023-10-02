import {collection, addDoc, serverTimestamp, doc, getDoc, getDocs, query, orderBy, updateDoc} from 'firebase/firestore'
import {db} from '../firebase'
import { getAuth } from 'firebase/auth'
import useStore from '../store';

const useApp = () => {
    const {currentUser: {uid}} = getAuth();
    const collRef = collection(db,`users/${uid}/boards`);
    const {setBoards, addBoard} =  useStore();


    const updateBoard = async (boardId, tabs) => {
        try{
            const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
            await updateDoc(docRef, {tabs} );
        } catch(err){
            console.log(err);
        }
    };

    const fetchBoard = async(boardId) => {
        const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
        try{
            const doc = await getDoc(docRef);
            if(doc.exists) {
                console.log("ff",doc.data())
                return doc.data();
            } else return null;

        } catch(err){
            console.log(err);
        }
    }

    const createBoard = async ({boardName, boardColor}) => {
        console.log("addition started");
        try{
            const doc = await addDoc(collRef,{
                name:boardName,
                color:boardColor,
                createdAt: serverTimestamp()
            });
            console.log("addition success");
            addBoard({name: boardName, color:boardColor, createdAt: new Date().toLocaleString('en-US'), id: doc.id});
        } catch(err){
            console.log(err);
            throw err;
        }
    }

    const fetchBoards = async (setLoading) => {
        try{
            const q = query(collRef, orderBy("createdAt","desc"));
            const fetchQuery = await getDocs(q);
            const boards = fetchQuery.docs.map(doc => ({...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate().toLocaleString('en-US')}));
            setBoards(boards);
        } catch(err){
            console.log(err);
           
        } finally{
            if(setLoading) setLoading(false);
        }
    }

    return { createBoard, fetchBoards, fetchBoard, updateBoard };

}

export default useApp;