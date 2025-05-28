import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, Searchbar } from 'react-native-paper'
import { useRouter } from 'expo-router'


export default function Search() {
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const router = useRouter()
    const [searchTxt, setSearchTxt] = useState<string>('')
    const searchBarRef = useRef<React.ComponentRef<typeof Searchbar>>(null);

    const handleSerach = (srearchItem: string) => {
        const foundItem = searchHistory.includes(srearchItem)
        if (!foundItem) {
            const NewArray = [srearchItem, ...searchHistory]
            setSearchHistory(NewArray)
        }
        setSearchTxt('')
        searchBarRef.current?.clear()
    }


    return (
        <View className='flex-1 bg-white'>
            <View className='flex-row justify-between border-b-2 border-gray-200 p-2 items-center mb-5'>
                <View className='flex-row  items-center '>
                    <TouchableOpacity onPress={() => router.back()}>
                        <View className=''>
                            <Icon size={40} source={"close"} />
                        </View>
                    </TouchableOpacity>
                    <Text className='text-2xl'>Search</Text>
                </View>
            </View>
            <View className='m-2'>
                <View className='flex-row items-center'>
                    <Searchbar autoFocus ref={searchBarRef} onIconPress={() => handleSerach(searchTxt)} onSubmitEditing={() => handleSerach(searchTxt)} style={{ width: 450 }} value={searchTxt} onChangeText={setSearchTxt} placeholder='Sercah by username' />
                    <View className='pl-2 bg-white border-white border-[1px] justify-center p-2 rounded-[15px]'>
                        <TouchableOpacity onPress={() => router.push("/ScanQr")}>
                            <Icon size={35} source={"scan-helper"} />

                        </TouchableOpacity>
                    </View>
                </View>
                <View className='mt-16  ml-2 justify-between flex-row '>
                    <View>
                        <Text className=''>History</Text>

                    </View>
                    <View className=''>
                        <TouchableOpacity onPress={() => setSearchHistory([])}>
                            <Icon size={35} source='trash-can' />
                        </TouchableOpacity>

                    </View>
                </View>
                <ScrollView style={{ height: 763 }}
                >
                    <View className='pl-2 mt-10 gap-10 '>


                        {searchHistory.map((item, index: number) => {
                            return <TouchableOpacity key={index} onPress={() => handleSerach(item)}>
                                <Text className='text-xl'>{item}</Text>
                            </TouchableOpacity>
                        })}
                    </View>

                </ScrollView>

            </View>

        </View >
    )
}