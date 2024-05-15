import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// ToDo 항목에 대한 타입 정의
export interface ToDos {
  text: string;
  id: number;
}

// createSlice를 사용하여 슬라이스 정의
const toDosSlice = createSlice({
  name: "toDos",
  initialState: [{ id: 1, text: "hi" }] as ToDos[],
  reducers: {
    // addToDo 액션
    addToDo: (state, action: PayloadAction<string>) => {
      const newToDo = { text: action.payload, id: Date.now() };
      state.unshift(newToDo); // 새 ToDo 항목을 상태에 추가
    },
    // deleteToDo 액션
    deleteToDo: (state, action: PayloadAction<number>) => {
      return state.filter((toDo) => toDo.id !== action.payload); // ID가 일치하지 않는 항목만 필터링
    },
  },
});

// 슬라이스에서 액션 생성자와 리듀서 추출
export const { addToDo, deleteToDo } = toDosSlice.actions;

// configureStore를 사용하여 스토어 구성
const store = configureStore({
  reducer: {
    toDos: toDosSlice.reducer,
  },
});
// 스토어의 전체 상태 타입 정의
export type ToDosState = ReturnType<typeof store.getState>;
export default store;
