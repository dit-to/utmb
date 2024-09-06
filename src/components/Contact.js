import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Firebase 초기화 파일에서 Firestore 가져오기
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore'; // Firestore 메서드들 가져오기

const Contact = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Firestore에서 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    const querySnapshot = await getDocs(collection(db, 'comments'));
    const fetchedComments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setComments(fetchedComments);
  };

  // 댓글 추가 함수
  const handleAddComment = async () => {
    if (newComment.trim()) {
      await addDoc(collection(db, 'comments'), {
        text: newComment,
        reply: '', // 기본적으로 reply 필드를 빈 문자열로 추가
        timestamp: serverTimestamp()
      });
      setNewComment('');
      fetchComments();
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-title font-bold mb-4">무엇이 필요하신가요?</h2>
      <div className="mb-4 w-full">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="의견을 남겨주세요..."
          className="w-full p-3 border rounded-md font-title font-400"
        ></textarea>
        <div className='flex flex-row w-full justify-end'>
          <button
            onClick={handleAddComment}
            className="mt-2 bg-primary-500 font-600 text-lg text-white py-3 px-6 rounded-full"
          >
            의견 남기기
          </button>
        </div>
      </div>
      <div className='mt-10'>
      {comments.map(comment => (
          <div key={comment.id} className="p-3 mb-2 bg-gray-100 rounded-md font-title font-400">
            <p>{comment.text}</p>
            <small className="text-gray-500 font-title font-200">
              {comment.timestamp?.toDate().toLocaleString() || '방금 전'}
            </small>
            <div className="mt-2 bg-gray-200 p-[10px] rounded-md">
              <p className="text-md font-title font-400 text-primary-900">
                🧑🏻‍💻 {comment.reply ? comment.reply : '아직 답글이 없습니다.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;