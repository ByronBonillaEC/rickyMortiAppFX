import { useEffect, useState } from "react";
import { getPersonajes } from "../lib/rickyMorty";
import { CharacterCard } from "./CharacterCard";
import { ActivityIndicator, FlatList, View } from "react-native";

export function Main() {

  const [personajes, setPersonajes] = useState([]);

  useEffect(()=>{
    getPersonajes().then((data)=>{
      setPersonajes(data);
      console.log("personajes:", data);
    })
  }, []);

    return (
        <View style={{ flex: 1 }}>
            {personajes.length === 0 ? (
                <ActivityIndicator size={"large"} />
            ): (
                <FlatList
                    data={personajes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={
                        ({item, index}) => (
                            <CharacterCard character={item} index={index} />
                        )
                    }
                >
                </FlatList>
            )
        }
        </View>
    );
}