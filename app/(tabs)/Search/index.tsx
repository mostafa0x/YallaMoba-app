import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Icon, Searchbar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import callToast from 'components/toast'
import { ClearHistroySerach, GetHistroySerach, SetHistroySerach } from 'services/storage'


export default function Search() {
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const router = useRouter()
    const [searchTxt, setSearchTxt] = useState<string>('')
    const searchBarRef = useRef<React.ComponentRef<typeof Searchbar>>(null);

    const handleClearHistroy = async () => {
        await ClearHistroySerach()
        setSearchHistory([])
        callToast({ type: 'success', text1: "Yalla Moba", text2: "Cleared history" })
    }

    const handleDelete = async (itemIndex: number) => {
        const newHistory = searchHistory.filter((item, index) => index !== itemIndex)
        setSearchHistory(newHistory)
        await SetHistroySerach(newHistory)

    }
    const handleSerach = async (srearchItem: string) => {
        const foundItem = searchHistory.includes(srearchItem)
        if (!foundItem) {
            const NewArray = [srearchItem, ...searchHistory]
            setSearchHistory(NewArray)
            await SetHistroySerach(NewArray)
        }
        setSearchTxt('')
        searchBarRef.current?.clear()
    }


    useEffect(() => {
        const fetchHistory = async () => {
            const resHS: string[] | null = await GetHistroySerach()
            resHS ? setSearchHistory(resHS) : await SetHistroySerach([])
            // resHS ? setSearchHistory(resHS) : setSearchHistory([])
        }
        fetchHistory()
        return () => {

        }
    }, [])

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
                        <Text className=''>History Search...</Text>

                    </View>
                    <View className=''>
                        <TouchableOpacity onPress={handleClearHistroy}>
                            <Icon size={35} source='trash-can' />
                        </TouchableOpacity>

                    </View>
                </View>
                <ScrollView style={{ height: 763 }}
                >
                    <View className='pl-2 mt-10 gap-10 '>


                        {searchHistory.map((item, index: number) => {
                            return <View className='flex-row justify-between pr-2' key={index}>
                                <TouchableOpacity className='w-[400px]' onPress={() => handleSerach(item)}>
                                    <Text className='text-xl'>{item}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDelete(index)}>
                                    <Icon size={25} source={"close"} />
                                </TouchableOpacity>
                            </View>
                        })}
                    </View>

                </ScrollView>

            </View>

        </View >
    )
}