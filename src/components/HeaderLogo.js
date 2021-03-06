import React from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';

function HeaderLogo({ headerSize }) {
    const svgWidth =
        Platform.OS === 'web'
            ? {
                  //width of logo is calculated using existing aspect ratio of SVG image and known height of header Logo(70% of headerSize)
                  width: (headerSize * 0.7(50000000 - 200000)) / 7954539,
              }
            : {
                  // viewBox side ratio is used as aspectRatio to display entire svg while retaining original aspect ratio
                  aspectRatio: (50000000 - 200000) / 7954539,
              };

    return (
        <View style={[styles.container]}>
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="200000 0 50000000 7954539"
                style={{
                    height: '70%',
                    // aspectRatio: (50000000 - 200000) / 7954539,
                    ...svgWidth,
                }}
            >
                <Defs>
                    <LinearGradient
                        id="prefix__a"
                        gradientUnits="userSpaceOnUse"
                        x1={2626100}
                        y1={3482360}
                        x2={5616040}
                        y2={3482360}
                    >
                        <Stop offset={0} stopColor="#2E4153" />
                        <Stop offset={1} stopColor="#243241" />
                    </LinearGradient>
                </Defs>
                <Path
                    fill="#BBCEDB"
                    d="M3921530 494855l1741938 1741966 1741953 1741925-1741953 1741912-1741938 1741979-1741952-1741979L437639 3978746l1741939-1741925z"
                />
                <Path
                    fill="#486D84"
                    d="M3922966 505083L2184973 2242216 448416 3979484l-400138-40 1936619-1937304L3922885 106165z"
                />
                <Path
                    fill="#8BABBB"
                    d="M3922979 505995l1734906 1736570 1734933 1736517 399763 13-1934794-1936592L3922979 105843zM3921530 7448974L2184973 5714189 448416 3979471l-400138-14 1936619 1934593 1936633 1934660z"
                />
                <Path
                    fill="#486D84"
                    d="M3922979 7448611l1734906-1734771 1734933-1734718 399763-27-1934794 1934606-1934808 1934646z"
                />
                <Path
                    fill="url(#prefix__a)"
                    fillRule="nonzero"
                    d="M4997179 2765552v637353h455664v273761h-455664v909476l725 40-765 16683 40 26414h-228c684 23071 3543 45727 8308 66651 5502 24200 13609 46104 23850 63699 8227 14133 18092 26911 29299 38091 11409 11355 24280 21193 38319 29286 14804 8550 31152 15368 48680 20280 17556 4926 36373 7973 56116 8993 35353 1838 73658-2551 113708-13731 38560-10764 78879-27863 119936-51740l18602-10845 13 304054-8106 3020c-43715 16159-87268 27608-129975 34560-43808 7114-86744 9476-128083 7315-41473-2174-81496-8872-119519-19824-38333-10979-74598-26346-108219-45767-34561-19972-66236-44198-94394-72289-27823-27797-52264-59431-72692-94556-22280-38305-39741-82596-51498-130364-11570-46989-17650-97535-17475-149289l-175-940157h-928548v1452608h-273747V3676666h-783729v1452608h-273761V3403039l1057490-134v-156080h483c751-46506 6536-90422 16871-131398 11650-46318 29098-89066 51525-127747 20509-35406 45003-67189 72853-95038 28346-28280 60196-52640 94971-72732 33796-19529 70289-35004 108823-46104 38131-10978 78436-17703 120298-19890 41647-2188 84892 188 129076 7355 43029 6992 86918 18535 131008 34829l8093 3020c188 101279 54 202572 54 303865l-18616-10791c-41338-23957-81993-41110-120915-51901-40426-11221-79080-15610-114795-13744-20012 1047-39071 4120-56854 9113-17757 4966-34319 11878-49325 20549-14200 8200-27205 18173-38721 29675-11341 11314-21327 24266-29649 38641-10348 17864-18427 38319-23836 61135-5302 22401-8067 46989-7946 73564l94 143679h928749l-134-649714 273721-27v12388zm-2272026 503982h-261292v-273761h273734v273761h-12442z"
                />
                <Path
                    fill="#F7F7F7"
                    fillRule="nonzero"
                    d="M8851318 5008775h445518V2292708h-445518zM11309462 5008775h441598V3738673c0-601838-379080-918387-883210-918387-257923 0-496318 105520-640909 281384v-246206h-445517v2153311h445517V3805111c0-394717 214934-597934 543213-597934 324361 0 539308 203217 539308 597934v1203664zM12270812 5008775h449423V3218908h398623v-363444h-398623v-152416c0-246207 93791-339997 367364-339997v-371269c-562756 0-816787 214947-816787 711266v152416h-254017v363444h254017v1789867zM15463655 3930160c0-676088-484601-1109874-1098157-1109874s-1098144 433786-1098144 1109874c0 676087 465046 1113793 1078602 1113793 617475 0 1117699-437706 1117699-1113793zm-1742972 0c0-488494 300913-722983 637004-722983 332185 0 648734 234489 648734 722983 0 488507-328280 726888-660465 726888-336091 0-625273-238381-625273-726888zM15850534 3781663h1606192v-375175h-1606192zM19821066 4238897c0-992636-1438154-609650-1438154-1223206 0-261842 199311-386892 457248-379080 281371 7811 441598 175863 457234 359538h492413c-39084-465059-406434-738619-926200-738619-554944 0-934024 297007-934024 773784 0 1000461 1442060 574485 1442060 1231031 0 230570-175864 398622-488494 398622-308737 0-465059-179769-484601-402528h-476776c0 480682 418164 777689 961377 777689 605731 0 937917-390797 937917-797231zM21095073 4496821l-605745-1641357h-496318l848032 2118133-437693 1047356h461140l1320916-3165489h-461153zM24026073 4406936c-23447-777689-1238842-535388-1238842-969189 0-144591 125062-242287 363444-242287 242300 0 386892 128955 402528 316549h445517c-23447-429881-343902-691723-832409-691723-508035 0-828503 277465-828503 621380 0 789420 1250573 547119 1250573 969189 0 148497-136780 257924-394717 257924-246206 0-414245-144592-429881-320455h-461140c19542 390797 382986 695629 898846 695629 508035 0 824584-273573 824584-637017zM25178937 2656153h726888v2352622h445518V2656153h722982v-363445h-1895388zM28328791 3195460c332185 0 594014 211028 601839 543213h-1191948c46895-339996 289196-543213 590109-543213zm1008272 1172406h-480695c-82060 168038-234476 300913-508036 300913-328279 0-582297-214948-613556-570567h1645277c11717-74262 15622-144605 15622-218853 0-633098-433787-1059073-1047343-1059073-637003 0-1074709 433786-1074709 1109874 0 676087 457248 1113793 1074709 1113793 527578 0 867574-300926 988731-676087zM29583256 3930160c0 676087 437706 1113793 1055168 1113793 527577 0 871492-293101 992636-715171h-480682c-82073 222759-246206 339997-511954 339997-359539 0-597920-265749-597920-738619 0-468965 238381-734700 597920-734700 265748 0 437692 132874 511954 339997h480682c-121144-453329-465059-715171-992636-715171-617462 0-1055168 437692-1055168 1109874zM31974962 5008775h445518V3805111c0-394717 214933-597934 543213-597934 324360 0 539308 203217 539308 597934v1203664h441598V3738673c0-601838-375161-918387-855857-918387-277465 0-519766 105520-668262 285290v-988731h-445518v2891930zM35937683 5008775h441598V3738673c0-601838-379080-918387-883210-918387-257923 0-496318 105520-640909 281384v-246206h-445517v2153311h445517V3805111c0-394717 214934-597934 543213-597934 324361 0 539308 203217 539308 597934v1203664zM38896037 3930160c0-676088-484601-1109874-1098158-1109874-613556 0-1098143 433786-1098143 1109874 0 676087 465046 1113793 1078602 1113793 617475 0 1117699-437706 1117699-1113793zm-1742973 0c0-488494 300913-722983 637004-722983 332185 0 648734 234489 648734 722983 0 488507-328279 726888-660464 726888-336091 0-625274-238381-625274-726888zM39236020 5008775h445517V2116845h-445517zM42217835 3930160c0-676088-484602-1109874-1098158-1109874s-1098143 433786-1098143 1109874c0 676087 465045 1113793 1078602 1113793 617475 0 1117699-437706 1117699-1113793zm-1742973 0c0-488494 300913-722983 637004-722983 332185 0 648734 234489 648734 722983 0 488507-328279 726888-660464 726888-336091 0-625274-238381-625274-726888zM42409307 3922348c0 664357 449423 1121605 1016084 1121605 351727 0 609651-175863 746430-359538v359538c0 429881-257923 640909-601825 640909-308738 0-547119-152415-613556-375174h-441612c54707 476776 480682 762066 1055168 762066 672182 0 1051248-441598 1051248-1027801V2855464h-449423v312643c-132860-183688-394703-347821-746430-347821-566661 0-1016084 437692-1016084 1102062zm1762514 7812c0 465059-316549 726888-652626 726888-332185 0-652640-269654-652640-734700 0-465059 320455-715171 652640-715171 336077 0 652626 261843 652626 722983zM45105832 5008775h445518V2855464h-445518v2153311zm226665-2438601c156321 0 281370-125050 281370-285290 0-160228-125049-285277-281370-285277-160228 0-285290 125049-285290 285277 0 160240 125062 285290 285290 285290zM46942595 3195460c332185 0 594014 211028 601839 543213h-1191948c46895-339996 289196-543213 590109-543213zm1008272 1172406h-480695c-82060 168038-234476 300913-508035 300913-328280 0-582298-214948-613557-570567h1645277c11717-74262 15622-144605 15622-218853 0-633098-433786-1059073-1047342-1059073-637004 0-1074710 433786-1074710 1109874 0 676087 457248 1113793 1074710 1113793 527577 0 867573-300926 988730-676087zM49951763 4406936c-23448-777689-1238843-535388-1238843-969189 0-144591 125063-242287 363444-242287 242301 0 386892 128955 402528 316549h445517c-23447-429881-343902-691723-832409-691723-508035 0-828503 277465-828503 621380 0 789420 1250573 547119 1250573 969189 0 148497-136780 257924-394716 257924-246207 0-414245-144592-429881-320455h-461141c19542 390797 382986 695629 898846 695629 508036 0 824585-273573 824585-637017z"
                />
            </Svg>
        </View>
    );
}

HeaderLogo.propTypes = {
    headerSize: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
});

export default HeaderLogo;
