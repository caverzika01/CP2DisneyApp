import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '..';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detail'>;

interface Character {
  _id: number;
  name: string;
  films: string[];
  tvShows: string[];
  videoGames: string[];
  parkAttractions: string[];
  imageUrl: string;
  url: string;
}

interface DetailScreenProps {
  route: DetailScreenRouteProp;
}

export default function DetailScreen({ route }: DetailScreenProps) {
  const { characterId } = route.params;
  const [character, setCharacter] = useState<Character | null>(null);

  async function fetchCharacterDetail() {
    try {
      const response = await axios.get(`https://api.disneyapi.dev/character/${characterId}`);
      setCharacter(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erro ao buscar os detalhes do personagem: ', error);
    }
  }

  useEffect(() => {
    fetchCharacterDetail();
  }, [characterId]);

  if (!character) {
    return (
      <SafeAreaView>
        <Text>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>{character.name}</Text>
        <Image style={styles.image} source={{ uri: character.imageUrl }} />

        <Text style={styles.subtitle}>Filmes:</Text>
        {character.films && character.films.length > 0 ? (
          character.films.map((film, index) => (
            <Text key={index} style={styles.text}>
              {film}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>O personagem não participou em filmes.</Text>
        )}

        <Text style={styles.subtitle}>Séries de TV:</Text>
        {character.tvShows && character.tvShows.length > 0 ? (
          character.tvShows.map((show, index) => (
            <Text key={index} style={styles.text}>
              {show}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>O personagem não participa de séries de TV.</Text>
        )}

        <Text style={styles.subtitle}>Video Games:</Text>
        {character.videoGames && character.videoGames.length > 0 ? (
          character.videoGames.map((game, index) => (
            <Text key={index} style={styles.text}>
              {game}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>O personagem não participou de games.</Text>
        )}

        {/* Verifica se o personagem participa de atrações antes de exibir o campo */}
        {character.parkAttractions && character.parkAttractions.length > 0 && (
          <>
            <Text style={styles.subtitle}>Atrações do Parque:</Text>
            {character.parkAttractions.map((attr, index) => (
              <Text key={index} style={styles.text}>
                {attr}
              </Text>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
    margin: 10
  },
  text: {
    fontSize: 16,
    margin: 10,
    marginVertical: 5
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: 'black'
  },
});
