import 'package:area/pages/actions_reactions.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:area/api/auth_google.dart';
import 'package:area/pages/dashboard.dart';
import 'package:area/pages/register.dart';
import 'package:area/pages/settings.dart';
import 'package:area/pages/notifications.dart';
import 'package:area/theme/theme.dart';
import 'package:area/pages/login.dart';
import 'package:area/pages/home.dart';
import 'package:area/components/api.dart';

class Area extends StatefulWidget {
  const Area({Key? key}) : super(key: key);

  @override
  State<Area> createState() => AreaState();
}

class AreaState extends State<Area> {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => GoogleLoginProvider(),
      child: MaterialApp(
        title: 'Area',
        theme: areaTheme,
        debugShowCheckedModeBanner: false,
        home: const Scaffold(
          resizeToAvoidBottomInset: false,
          body: Home(),
        ),
        routes: {
          '/login': (context) => const Login(),
          '/register': (context) => const Register(),
          '/home': (context) => const Home(),
          '/dashboard': (context) => const Dashboard(),
          '/settings': (context) => const Settings(),
          '/notifications': (context) => const Notifications(),
          '/apipage': (context) => const ApiPage(),
          '/actionsreactions': (context) => const ActionsReactions(),
        },
      ),
    );
  }
}
