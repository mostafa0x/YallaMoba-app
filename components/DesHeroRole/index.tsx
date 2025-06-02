import { View, Text, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

import { RoleFace } from 'types/interfaces/store/UserFace';
import { HerosROlesFace } from 'types/interfaces/store/AvatarFace';

export default function DesHeroRole({ Role, currRole }: { Role: RoleFace; currRole: string }) {
  const opacity = useRef(new Animated.Value(0)).current;

  const desHeroRoles: HerosROlesFace = {
    MM: "Marksmen are ranged heroes whose power is almost entirely based on their basic attacks: by using their reach to land massive continuous damage from a distance, marksmen's are capable of taking down even the most difficult opponents when positioned behind the safety of their team, and perform better at securing objectives such as the Lord and turrets. Marksmen's are classified into three types: pure, primary, and secondary.",
    Exp: "Fighters are close-range combatants that possess a mixture of offensive and defensive capabilities. A fighter's damage will add up over time to make it a major threat. Each fighter has a unique blend of mobility, damage, disruption and durability. The role of a Fighter is an intermediate melee hero, between durability or damage, hence makes fighters serve as multi-purpose combatant, such as the Semi-Tank, Crowd Controller, or Burst Damage Dealer. Fighters are classified into three types: pure, primary, and secondary.",
    Jungle:
      'An Assassin is an agile hero that specializes in killing or disabling roaming targets picking them off as they try to replenish HP. Focused on infiltration, deception, and mobility, Assassins are opportunistic hunters who find favorable moments within a fight before jumping into the fray. Regardless of the size of the enemy team, Assassins specialize in positioning and artful killing. They strike when the time is right – no sooner, no later. Assassins are more suitable to be played by experienced players as they have low HP and high burst damage. They are ideal for taking out opponents easily, but are easier to be killed due to bad positioning and wrong timing.',
    Mid: 'A magician (abbreviated as mage) is a hero with a longer range, ability-based area of effect damage, and crowd control that they may utilize to strike from a distance. Mages primarily focus on magic skills that deals magic damage, usually burst damage, and as a consequence, they spend a lot of gold on equipment that allows them to do more damage and have shorter skill cooldowns.Though mages typically focus on killing prime targets in combat, they can also use their innate crowd control and utility to manipulate opponents, protecting their team from them or setting them up for a takedown, and in the right circumstances, can damage and control multiple enemies at the same time. Regardless of their might, mages are fundamentally frail and succumb fast to direct attacks',
    Roam: 'Tanks heroes are the most durable among all in Mobile Legends. These front-line giants help in attacking enemies. They are usually found leading the charge, choosing the right times and situations to initiate aggression. Many tanks can also protect their more fragile teammates by stunning or pushing around dangerous foes and limiting their damage potential. In Mobile Legends, most classes of heroes are really versatile in terms of abilities and with the item crafting variations. A "tank" can be played as a DPS if you choose the right equipment. Usually, tanks choose to lane on the bottom tower. Tanks have high defense and hitpoints, but low damage. When used properly, a tank could be the strongest hero in the game.',
  };
  useEffect(() => {
    opacity.setValue(0);
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });
    animation.start();
    return () => {
      animation.stop();
    };
  }, [currRole]);

  return (
    <View style={{ margin: 25 }}>
      <Animated.Text style={{ fontSize: 15, color: 'white', opacity }}>
        {desHeroRoles[Role]}
      </Animated.Text>
    </View>
  );
}
