import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductCard from '../components/ProductCard';
import { Dimensions } from 'react-native';
import { addToCart, addToFavorites } from '../actions';

const Tab = createBottomTabNavigator();

const HomeScreen = ({ addToCart, addToFavorites, navigation }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);

        const results = products.filter((product) =>
            product.title.toLowerCase().includes(text.toLowerCase())
        );
        setSearchResults(results);
    };

    const clearSearch = () => {
        setSearchText('');
        setSearchResults([]);
        setSelectedProduct(null);
    };

    const handleSuggestionClick = (product) => {
        setSearchText(product.title);
        setSelectedProduct(product);
        setSearchResults([]);
    };

    const handleHomePress = () => {
        // Reset search state
        setSearchText('');
        setSearchResults([]);
        setSelectedProduct(null);
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!Array.isArray(products)) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: Products data is not in the expected format</Text>
            </View>
        );
    }


    return (
        <View style={{ flex: 1, height: windowHeight * 1 }}>
            <View style={{ backgroundColor: 'blue', padding: 16, height: windowHeight * 0.20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Hey Rahul</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <Text style={{ color: 'white', fontSize: 18 }}>&#x1F6D2;</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={{ backgroundColor: 'white', borderRadius: 8, marginTop: 8, padding: 8 }}
                    placeholder="Search by name"
                    value={searchText}
                    onChangeText={(text) => handleSearch(text)}
                />
                {searchText.length > 0 && (
                    <FlatList
                        data={searchResults}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSuggestionClick(item)}>
                                <Text style={{ padding: 8 }}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text style={{ color: 'white' }}>Deliver to: Mumbai</Text>
                    <Text style={{ color: 'white' }}>Within: 2Hrs</Text>
                </View>
            </View>

            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 16, height: windowHeight * 0.3 }}>
                    {searchText.length === 0
                        ? 
                        products.map((product) => (
                            <View key={product.id} style={{ width: '30%', marginBottom: 16 }}>
                                <ProductCard
                                    product={product}
                                    onAddToCart={() => addToCart(product)}
                                    onAddToFavorites={() => addToFavorites(product)}
                                    onPress={() => navigation.navigate('ProductDetails', { product })}
                                />
                            </View>
                        ))
                        : 
                        selectedProduct ? (
                            <View style={{ width: '30%', marginBottom: 16 }}>
                                <ProductCard
                                    product={selectedProduct}
                                    onAddToCart={() => addToCart(selectedProduct)}
                                    onAddToFavorites={() => addToFavorites(selectedProduct)}
                                    onPress={() => navigation.navigate('ProductDetails', { selectedProduct })}
                                />
                            </View>
                        ) : (
                            
                            searchResults.map((product) => (
                                <View key={product.id} style={{ width: '30%', marginBottom: 16 }}>
                                    <ProductCard
                                        product={product}
                                        onAddToCart={() => addToCart(product)}
                                        onAddToFavorites={() => addToFavorites(product)}
                                        onPress={() => navigation.navigate('ProductDetails', { product })}
                                    />
                                </View>
                            ))
                        )}
                </View>
            </ScrollView>
            
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    height: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: 'gray',
                    height: windowHeight * 0.05
                }}
            >
                <TouchableOpacity onPress={() => handleHomePress()}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>&#x1F3E0;</Text>
                        <Text>Home</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>&#x1F4E6;</Text>
                        <Text>Categories</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>&#x2B50;</Text>
                        <Text>Favorites</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('More')}>
                    <View style={{ alignItems: 'center' }}>
                        <Text>&#x2699;</Text>
                        <Text>More</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const CategoriesScreen = () => (
    <View>
        <Text>Categories Screen</Text>
    </View>
);

const FavoritesScreen = () => (
    <View>
        <Text>Favorites Screen</Text>
    </View>
);

const MoreScreen = () => (
    <View>
        <Text>More Screen</Text>
    </View>
);

export default connect(null, { addToCart, addToFavorites })(HomeScreen);