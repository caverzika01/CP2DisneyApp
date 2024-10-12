import { ThemedView } from '@/components/ThemedView';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, View, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '..';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

interface Character {
  _id: number;
  films: string[];
  videoGames: string[];
  name: string;
  imageUrl: string;
  url: string;
}

export default function HomeScreen() {
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [searchId, setSearchId] = useState<string>('');
  const navigation = useNavigation<HomeScreenNavigationProp>();

  async function fetchCharacters() {
    try {
      const response = await axios.get('https://api.disneyapi.dev/character');
      setCharactersList(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar os personagens: ', error);
    }
  }

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleSearch = () => {
    if (searchId) {
      navigation.navigate('Detail', { characterId: parseInt(searchId) });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <ThemedView>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Buscar personagem por ID"
              keyboardType="numeric"
              value={searchId}
              onChangeText={setSearchId}
            />
            <Button
              title="Buscar"
              onPress={handleSearch}
              color="#008000" 
            />
          </View>

          {charactersList.map((char) => (
            <TouchableHighlight
              style={styles.card}
              key={char._id}
              onPress={() => navigation.navigate('Detail', { characterId: char._id })}
              underlayColor="#dbdbdb"
            >
              <View>
                <Text style={styles.title}>{char.name}</Text>
                <Text style={styles.subtitle}>Filmes:</Text>
                {char.films.length > 0 ? (
                  char.films.map((film, index) => (
                    <Text key={`${char._id}-film-${index}`} style={styles.text}>
                      {film}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.text}>O personagem não participou em filmes.</Text>
                )}
                <Image style={styles.image} source={{ uri: char.imageUrl }} />
              </View>
            </TouchableHighlight>
          ))}

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  card: {
    marginTop: 25,
    margin: 10,
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
  },
  text: {
    fontSize: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginVertical: 5,
  },
});
