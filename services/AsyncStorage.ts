import AsyncStorageService from "@react-native-async-storage/async-storage";

export namespace AsyncStorage {
  export const add = async <T>(key: string, value: T): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorageService.setItem(key, jsonValue);
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };

  export const get = async <T>(key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorageService.getItem(key);
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      return data as T;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  export const remove = async (key: string): Promise<void> => {
    try {
      await AsyncStorageService.removeItem(key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  };

  export const clear = async (): Promise<void> => {
    try {
      await AsyncStorageService.clear();
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };
}
