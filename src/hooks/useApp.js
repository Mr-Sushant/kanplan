import {collection, addDoc, serverTimestamp, doc, getDoc, getDocs, query, orderBy, updateDoc, deleteDoc} from 'firebase/firestore'
import {db} from '../firebase'
import { getAuth } from 'firebase/auth'
import useStore from '../store';
import { useNavigate } from 'react-router-dom';



const useApp = () => {
    const {currentUser: {uid}} = getAuth();
    const collRef = collection(db,`users/${uid}/boards`);
    const {boards, setBoards, addBoard, setToastr} =  useStore();
    const navigate = useNavigate();

    const updateBoard = async (boardId, tabs) => {
        try{
            const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
            await updateDoc(docRef, {tabs, lastUpdated: serverTimestamp()} );
        } catch(err){
            setToastr('Error updating board');
            throw err;
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
            setToastr('Error frtching board');
            throw err;
        }
    }

    const createBoard = async ({boardName, boardColor}) => {
        try{
            const doc = await addDoc(collRef,{
                name:boardName,
                color:boardColor,
                createdAt: serverTimestamp()
            });
            addBoard({name: boardName, color:boardColor, createdAt: new Date().toLocaleString('en-US'), id: doc.id});
        } catch(err){
            setToastr('Error Creating Board.');
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
            setToastr("Error fetching boards.");
        } finally{
            if(setLoading) setLoading(false);
        }
    }

    const deleteBoard = async (boardId) => {
        try{
            const docRef = doc(db, `users/${uid}/boards/${boardId}`);
            await deleteDoc(docRef);
            const tempBoards = boards.filter(board => board.id !== boardId);
            setBoards(tempBoards);
            navigate('/boards');
        } catch(err){
            setToastr("Error deleting the board.");
            throw err;
        }
    };

    return { createBoard, fetchBoards, fetchBoard, updateBoard, deleteBoard };

}

export default useApp;