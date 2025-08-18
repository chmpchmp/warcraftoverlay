using Blizzard.Net.Warcraft3.Statistics;

using System.Text;

namespace Server
{
    class Data
    {
        private const int REFRESH_RATE = 500;

        private static ObserverData file = null;
        private static Dictionary<string, Dictionary<string, string>> dict = new Dictionary<string, Dictionary<string, string>>();

        private static void InitializeDictionary()
        {
            // initializes the main dictionary with empty dictionaries
            dict["status"] = new Dictionary<string, string>();
            dict["stats"] = new Dictionary<string, string>();
            dict["p1"] = new Dictionary<string, string>();
            dict["p2"] = new Dictionary<string, string>();
        }

        public Data()
        {
            InitializeDictionary();
        }

        public int GetRefreshRate()
        {
            return REFRESH_RATE;
        }

        public Dictionary<string, Dictionary<string, string>> Fetch()
        {
            if (file == null)
            {
                if (!ObserverData.TryOpen(out file))
                {
                    dict["status"]["application_opened"] = "false";
                    return dict;
                }

                file.RefreshRate = REFRESH_RATE;
            }
            else
            {
                if (file.RefreshRate == 0)
                {
                    // set file back to null once refresh rate is 0 to indicate that Warcraft III is closed
                    file.Dispose();
                    file = null;

                    // reset dictionary once game closes
                    InitializeDictionary();
                    dict["status"]["application_opened"] = "false";
                    return dict;
                }
            }

            dict["status"]["application_opened"] = "true";
            bool success = FetchGameData();

            if (!success)
            {
                return null;
            }

            return dict;
        }

        private unsafe bool FetchGameData()
        {
            if (file.Shops.Length == 0 || file.Players[file.Players.Length - 1].Structures.Length == 0)
            {
                return false;
            }

            if (file.Game->IsInGame && file.Game->NumberOfPlayers == 2)
            {
                dict["stats"]["map_name"] = FormatMapName(file.Game->MapName);
                dict["stats"]["time"] = FormatTime(file.Game->GameTime.ToString());

                for (int i = 1; i <= file.Game->NumberOfPlayers; i++)
                {
                    FetchPlayerStats(i);
                    FetchHeroStats(i);
                    FetchProductionStats(i);
                    FetchUnitStats(i);
                    FetchUpgradeStats(i);
                }
            }

            return true;
        }

        private unsafe bool FetchPlayerStats(int playerNumber)
        {
            dict["p" + playerNumber.ToString()]["name"] = file.Players[playerNumber - 1].Name;
            dict["p" + playerNumber.ToString()]["race"] = FormatRace(file.Players[playerNumber - 1].Race.ToString());
            dict["p" + playerNumber.ToString()]["gold"] = file.Players[playerNumber - 1].Gold.ToString();
            dict["p" + playerNumber.ToString()]["lumber"] = file.Players[playerNumber - 1].Lumber.ToString();
            dict["p" + playerNumber.ToString()]["food"] = file.Players[playerNumber - 1].FoodUsed.ToString();
            dict["p" + playerNumber.ToString()]["max_food"] = file.Players[playerNumber - 1].FoodCap.ToString();
            dict["p" + playerNumber.ToString()]["apm"] = file.Players[playerNumber - 1].ActionsPerMinute.ToString();
            dict["p" + playerNumber.ToString()]["color"] = FetchColorCode(file.Players[playerNumber - 1].TeamColor);

            return true;
        }

        private unsafe bool FetchHeroStats(int playerNumber)
        {
            dict["p" + playerNumber.ToString()]["hero1"] = "{}";
            dict["p" + playerNumber.ToString()]["hero2"] = "{}";
            dict["p" + playerNumber.ToString()]["hero3"] = "{}";

            foreach (ref var hero in file.Players[playerNumber - 1].Heroes)
            {
                Dictionary<string, string> heroInfo = new Dictionary<string, string>
                {
                    { "portrait", FormatButtonArtFile(hero.ButtonArt) },
                    { "level", hero.Level.ToString() },
                    { "xp", hero.Experience.ToString() },
                    { "lvlup_xp", hero.LevelUpExperience.ToString() },
                    { "hp", hero.HitPoints.ToString() },
                    { "max_hp", hero.MaxHitPoints.ToString() },
                    { "mana", hero.ManaPoints.ToString() },
                    { "max_mana", hero.MaxManaPoints.ToString() },
                };

                for (int n = 1; n <= 4; n++)
                {
                    heroInfo["ability" + n.ToString() + "_portrait"] = "";
                    heroInfo["ability" + n.ToString() + "_level"] = "0";
                }

                // reverse the order of abilities in list
                MemoryExtensions.Reverse(hero.Abilities);

                int i = 1;

                foreach (ref var ability in hero.Abilities)
                {
                    // detects items as abilities for some reason
                    if (ability.IsHeroAbility)
                    {
                        string buttonArt = FormatButtonArtFile(ability.ButtonArt);

                        if (buttonArt != "BTNTemp.png")
                        {
                            heroInfo["ability" + i.ToString() + "_portrait"] = buttonArt;
                            heroInfo["ability" + i.ToString() + "_level"] = ability.Level.ToString();

                            i++;
                        }
                    }
                }

                for (int n = 0; n <= 6; n++)
                {
                    heroInfo["item" + n.ToString() + "_portrait"] = "";
                    heroInfo["item" + n.ToString() + "_charges"] = "-1";
                }

                i = 1;

                foreach (ref var item in hero.Items)
                {
                    heroInfo["item" + i.ToString() + "_portrait"] = FormatButtonArtFile(item.ButtonArt);
                    heroInfo["item" + i.ToString() + "_charges"] = item.Charges.ToString();

                    i++;
                }

                dict["p" + playerNumber.ToString()]["hero" + hero.PickOrder] = ConvertDictionaryToString(heroInfo);
            }

            return true;
        }

        private unsafe bool FetchProductionStats(int playerNumber)
        {
            List<string> upgradeBA = new List<string>();
            List<string> unitBA = new List<string>();
            List<string> structureBA = new List<string>();

            List<string> upgradeProg = new List<string>();
            List<string> unitProg = new List<string>();
            List<string> structureProg = new List<string>();
            
            foreach (var unit in file.Players[playerNumber - 1].UnitsInQueue)
            {
                string buttonArt = FormatButtonArtFile(unit.ButtonArt);
                string progress = unit.TrainingProgress.ToString();

                switch ((int)unit.Type)
                {
                    case 0:
                        upgradeBA.Add(buttonArt);
                        upgradeProg.Add(progress);
                        break;
                    case 1:
                    case 2:
                        unitBA.Add(buttonArt);
                        unitProg.Add(progress);
                        break;
                }
            }

            foreach (var structure in file.Players[playerNumber - 1].Structures)
            {
                uint p = structure.ConstructionProgress;

                if (p != 100)
                {
                    structureBA.Add(FormatButtonArtFile(structure.ButtonArt));
                    structureProg.Add(p.ToString());
                }
                else
                {
                    uint u = structure.UpgradeProgress;

                    if (u != 0)
                    {
                        upgradeProg.Add(u.ToString());

                        switch (structure.Id)
                        {
                            case 1752461175:    // town hall
                                upgradeBA.Add("BTNKeep.png");
                                break;
                            case 1751868773:    // keep
                                upgradeBA.Add("BTNCastle.png");
                                break;
                            case 1869050469:    // great hall
                                upgradeBA.Add("BTNStronghold.png");
                                break;
                            case 1869837426:    // stronghold
                                upgradeBA.Add("BTNFortress.png");
                                break;
                            case 1970172012:    // necropolis
                                upgradeBA.Add("BTNHallOfTheDead.png");
                                break;
                            case 1970171953:    // halls of the dead
                                upgradeBA.Add("BTNBlackCitadel.png");
                                break;
                            case 1702129516:    // tree of life
                                upgradeBA.Add("BTNTreeOfAges.png");
                                break;
                            case 1702129505:    // tree of ages
                                upgradeBA.Add("BTNTreeOfEternity.png");
                                break;
                            default:
                                upgradeBA.Add(FormatButtonArtFile(structure.ButtonArt));
                                break;
                        }
                    }
                }
            }

            dict["p" + playerNumber.ToString()]["production_upgrade_portrait"] = ConvertListToString(upgradeBA);
            dict["p" + playerNumber.ToString()]["production_upgrade_progress"] = ConvertListToString(upgradeProg);

            dict["p" + playerNumber.ToString()]["production_unit_portrait"] = ConvertListToString(unitBA);
            dict["p" + playerNumber.ToString()]["production_unit_progress"] = ConvertListToString(unitProg);

            dict["p" + playerNumber.ToString()]["production_structure_portrait"] = ConvertListToString(structureBA);
            dict["p" + playerNumber.ToString()]["production_structure_progress"] = ConvertListToString(structureProg);
            
            return true;
        }

        private unsafe bool FetchUnitStats(int playerNumber)
        {
            List<string> buttonArt = new List<string>();
            List<string> count = new List<string>();

            foreach (var unit in file.Players[playerNumber - 1].Units)
            {
                if (!unit.IsPeon)
                {
                    uint c = unit.CurrentAmount;

                    if (c != 0)
                    {
                        buttonArt.Add(FormatButtonArtFile(unit.ButtonArt));
                        count.Add(c.ToString());
                    }
                }
            }

            dict["p" + playerNumber.ToString()]["unit_portrait"] = ConvertListToString(buttonArt);
            dict["p" + playerNumber.ToString()]["unit_count"] = ConvertListToString(count);

            return true;
        }

        private unsafe bool FetchUpgradeStats(int playerNumber)
        {
            List<string> buttonArt = new List<string>();

            foreach (var upgrade in file.Players[playerNumber - 1].Upgrades)
            {
                buttonArt.Add(FormatButtonArtFile(upgrade.ButtonArt));
            }

            dict["p" + playerNumber.ToString()]["upgrade_portrait"] = ConvertListToString(buttonArt);

            return true;
        }

        private static string FormatMapName(string mapName)
        {
            return mapName;
        }

        private static string FormatTime(string time)
        {
            string[] s = time.Split(".");

            if (s[0].Split(":")[0] != "00")
            {
                return s[0].Substring(0, 8);
            }

            return s[0].Substring(3, 5);
        }

        private static string FormatRace(string race)
        {
            if (race == "NightElf")
            {
                return "Night Elf";
            }

            return race;
        }

        private static string FetchColorCode(int colorNumber)
        {
            return colorNumber switch
            {
                0 => "ff0303",
                1 => "0042ff",
                2 => "1ce6b9",
                3 => "540081",
                4 => "fffc01",
                5 => "feba0e",
                6 => "20c000",
                7 => "e55bb0",
                8 => "959697",
                9 => "7ebff1",
                10 => "106246",
                11 => "4e2a04",
                12 => "9c0000",
                13 => "0000c3",
                14 => "00ebff",
                15 => "bd00ff",
                16 => "ecce87",
                17 => "f7a58b",
                18 => "bfff81",
                19 => "dbb8eb",
                20 => "4f5055",
                21 => "ecf0ff",
                22 => "00781e",
                23 => "a56f34",
                _ => "",
            };
        }

        private static string FormatButtonArtFile(string file)
        {
            string[] s;

            if (file.Contains('/'))
            {
                s = file.Split("/");
            }
            else
            {
                s = file.Split("\\");
            }

            string buttonArt = s[s.Length - 1].Split(".")[0] + ".png";

            // bandaid solution to not having access to w3champions custom item icons
            switch (buttonArt)
            {
                case "BTNClaw+5.png":
                case "BTNClaw+8.png":
                case "BTNClaw+12.png":
                case "BTNClaw+15.png":
                    buttonArt = "BTNClawsOfAttack.png";
                    break;
                case "BTNRoP+3.png":
                case "BTNRoP+4.png":
                case "BTNRoP+5.png":
                    buttonArt = "BTNRingGreen.png";
                    break;
                default:
                    break;
            }

            return buttonArt;
        }

        public static string ConvertDictionaryToString(Dictionary<string, string> dictionary)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("{");
            bool first = true;
            foreach (KeyValuePair<string, string> entry in dictionary)
            {
                if (!first)
                {
                    sb.Append(", ");
                }
                sb.AppendFormat("\"{0}\": \"{1}\"", entry.Key, entry.Value);
                first = false;
            }
            sb.Append("}");
            return sb.ToString();
        }
        
        public static string ConvertListToString(List<string> list)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("[");
            bool first = true;
            foreach (var str in list)
            {
                if (!first)
                {
                    sb.Append(", ");
                }
                sb.AppendFormat("\"{0}\"", str);
                first = false;
            }
            sb.Append("]");
            return sb.ToString();
        }
    }
}
