import axios from 'axios';
import { Diary, NewDiary} from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
}

const createDiary = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(baseUrl, object);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export default {
  getAllDiaries,
  createDiary,
};