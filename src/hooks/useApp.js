import {collection, addDoc, serverTimestamp, getDocs, query, orderBy} from 'firebase/firestore'
import {db} from '../firebase'
import { getAuth } from 'firebase/auth'
import useStore from '../store';

const useApp = () => {
    const {currentUser: {uid}} = getAuth();
    const collRef = collection(db,`users/${uid}/boards`);
    const {setBoards, addBoard} =  useStore();


    const createBoard = async ({boardName, boardColor}) => {
        try{
            await addDoc(collRef,{
                name:boardName,
                color:boardColor,
                createdAt: serverTimestamp()
            });
            addBoard({name: boardName, color:boardColor, createdAt: new Date().toLocaleDateString()});
        } catch(err){
            console.log(err);
            throw err;
        }
    }

    const fetchBoards = async (setLoading) => {
        try{
            const q = query(collRef, orderBy("createdAt","desc"));
            const fetchQuery = await getDocs(q);
            const boards = fetchQuery.docs.map(doc => ({...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate().toLocaleDateString()}));
            setBoards(boards);
        } catch(err){
            console.log(err);
           
        } finally{
            if(setLoading) setLoading(false);
        }
    }

    return { createBoard, fetchBoards };

}

export default useApp;