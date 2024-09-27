import { AuthRepository } from "../repository/auth.repository";

export function useSectionsRegData() {
  const sectionsData = reactive<Record<"industry" | "position" | "interesting", { name: string, id: number }[]>>({
    industry: [],
    position: [],
    interesting: [],
  });
  async function getSectionsData() {
    try {
      const dataHobby = await AuthRepository.getHobbyDirection();
      sectionsData.interesting = [...dataHobby.data].reverse();
      const dataJobDir = await AuthRepository.getJobDirection();
      sectionsData.industry = [...dataJobDir.data].reverse();
      const dataJobPos = await AuthRepository.getJobPosition();
      sectionsData.position = [...dataJobPos.data].reverse();
    } catch (error) {
      console.error("Sections Data", error);
    }
  }

  onMounted(() => {
    getSectionsData();
  });

  return {
    sectionsData,
  };
};
