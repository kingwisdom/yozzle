import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

interface HeaderProps {
  level: {
    id: number;
    title: string;
  };
  hints: number;
  onBack: () => void;
  onHint: () => void;
  onSettings: () => void;
}

const Header: React.FC<HeaderProps> = ({ level, hints, onBack, onHint, onSettings }) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-black/30">
      <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 justify-center items-center" onPress={onBack}>
        <Text className="text-white text-xl font-bold">←</Text>
      </TouchableOpacity>

      <View className="items-center flex-1">
        <Text className="text-white text-2xl font-bold shadow">LEVEL {level?.id}</Text>
        <Text className="text-white text-base font-semibold shadow">{level?.title}</Text>
      </View>

      <View className="flex-row items-center gap-2.5">
        <TouchableOpacity className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 justify-center items-center" onPress={onSettings}>
          <Text className="text-white text-xl font-bold">⚙</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-row items-center rounded-full px-3 py-2 border-2 border-white/30 ${hints === 0 ? 'bg-gray-500/50' : 'bg-orange-400/90'}`}
          onPress={onHint}
          disabled={hints === 0}
        >
          <Text className="text-base mr-1">🔍</Text>
          <Text className="text-white text-base font-bold shadow">{hints}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
