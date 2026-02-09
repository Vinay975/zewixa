import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { WatchlistContext } from "../FecthingData/watchingDetails";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { API_CONFIG } from "../config/api";

export default function WatchList() {
  const { watchlist, toggleWatch } = useContext(WatchlistContext);
  const navigation = useNavigation();

  if (!watchlist.length) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
        <View style={styles.empty}>
          <Ionicons name="bookmark-outline" size={80} color="#E5E7EB" />
          <Text style={styles.emptyTitle}>No Saved Properties</Text>
          <Text style={styles.emptySubtitle}>Your bookmarked properties will appear here</Text>
          <TouchableOpacity 
            style={styles.exploreButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Explore Properties</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Saved Properties</Text>
        <Text style={styles.headerSubtitle}>{watchlist.length} {watchlist.length === 1 ? 'property' : 'properties'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.list}>
      {watchlist.map((item) => {
        const isHostel = !!item.hostelName;
        const name = isHostel ? item.hostelName : item.apartmentName;
        const location = item.location || "Not specified";
        const owner = item.ownerData?.name || "Owner";
        const gender = isHostel ? item.gender : null;
        const imageUri = isHostel ? item.photos?.main : item.photos?.building;

        return (
          <TouchableOpacity
            key={item._id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(
                isHostel ? "HostelDetails" : "ApartmentDetails",
                {
                  [isHostel ? "hostel" : "apartment"]: item,
                }
              )
            }
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>
                  {isHostel ? "Hostel" : "Apartment"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleWatch(item)}
                style={styles.heartBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="heart" size={22} color="#FF4757" />
              </TouchableOpacity>
            </View>

            <View style={styles.info}>
              <Text style={styles.propertyName} numberOfLines={1}>
                {name}
              </Text>
              {isHostel ? (
                <>
                  <View style={styles.row}>
                    <Ionicons
                      name="location"
                      size={14}
                      color="#9CA3AF"
                    />
                    <Text style={styles.text} numberOfLines={1}>{location}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons
                      name={
                        gender === "Male"
                          ? "male"
                          : gender === "Female"
                          ? "female"
                          : "person"
                      }
                      size={14}
                      color="#9CA3AF"
                    />
                    <Text style={styles.text}>{gender}</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.row}>
                    <Ionicons
                      name="location"
                      size={14}
                      color="#9CA3AF"
                    />
                    <Text style={styles.text} numberOfLines={1}>{location}</Text>
                  </View>
                  <View style={styles.row}>
                    <Ionicons name="person" size={14} color="#9CA3AF" />
                    <Text style={styles.text}>{owner}</Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
    textAlign: "center",
  },
  exploreButton: {
    backgroundColor: "#6846bd",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#6846bd",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  typeBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(104, 70, 189, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  typeBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  heartBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  info: {
    padding: 16,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
  },
});
