// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:area/global/variables.dart' as global;
import 'package:area/main.dart' as main_app;
import 'package:area/app.dart';
import 'package:area/pages/dashboard.dart';
import 'package:area/pages/home.dart';
import 'package:area/pages/login.dart';
import 'package:area/pages/register.dart';
import 'package:area/pages/settings.dart';

void main() {
  // Check main
  group("Main test : ", () {
    test('main.dart file', () {
      expect(main_app.main, isNotNull);
    });
  });

  // Check app

  group("App test : ", () {
    test('app.dart file', () {
      expect(Area, isNotNull);
    });
  });

  // Check home page

  group("Home test : ", () {
    test('home.dart file', () {
      expect(Home, isNotNull);
    });
  });

  // Check Login page
  group("Login test : ", () {
    test('login.dart file', () {
      expect(Login, isNotNull);
    });
    Widget makeTestableWidget(Widget widget) {
      return const MediaQuery(
        data: MediaQueryData(),
        child: MaterialApp(
          home: Login(),
        ),
      );
    }

    testWidgets('textfields check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(TextField), findsNWidgets(2));
    });

    testWidgets('elevated buttons check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(ElevatedButton), findsWidgets);
    });

    testWidgets('texts widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Text), findsWidgets);
    });

    testWidgets('row widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Row), findsWidgets);
    });

    testWidgets('column widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Column), findsWidgets);
    });

    testWidgets('navigator widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Navigator), findsWidgets);
    });

    testWidgets('center widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Center), findsWidgets);
    });

    testWidgets('padding widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Padding), findsWidgets);
    });

    testWidgets('flexible widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Flexible), findsWidgets);
    });

    testWidgets('sized box widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(SizedBox), findsWidgets);
    });

    testWidgets('scaffold widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Scaffold), findsWidgets);
    });

    testWidgets('icons widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Icon), findsWidgets);
    });

    testWidgets('submit text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Submit"), findsOneWidget);
    });

    testWidgets('login texts check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Login"), findsOneWidget);
    });

    testWidgets('email text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Email"), findsNWidgets(2));
    });

    testWidgets('password text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Password"), findsNWidgets(2));
    });
  });

  // Check Register page
  group("Register page : ", () {
    test('register.dart file', () {
      expect(Register, isNotNull);
    });
    Widget makeTestableWidget(Widget widget) {
      return const MediaQuery(
        data: MediaQueryData(),
        child: MaterialApp(
          home: Register(),
        ),
      );
    }

    testWidgets('textfields check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(TextField), findsNWidgets(2));
    });

    testWidgets('elevated buttons check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(ElevatedButton), findsWidgets);
    });

    testWidgets('texts widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Text), findsWidgets);
    });

    testWidgets('column widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Column), findsWidgets);
    });

    testWidgets('navigator widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Navigator), findsWidgets);
    });

    testWidgets('center widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Center), findsWidgets);
    });

    testWidgets('padding widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Padding), findsWidgets);
    });

    testWidgets('flexible widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Flexible), findsWidgets);
    });

    testWidgets('sized box widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(SizedBox), findsWidgets);
    });

    testWidgets('scaffold widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Scaffold), findsWidgets);
    });

    testWidgets('icons widget check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.byType(Icon), findsWidgets);
    });

    testWidgets('submit text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Create account"), findsOneWidget);
    });

    testWidgets('login texts check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Create an account"), findsOneWidget);
    });

    testWidgets('email text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Email"), findsNWidgets(2));
    });

    testWidgets('password text check', (WidgetTester tester) async {
      await tester.pumpWidget(makeTestableWidget(const Login()));
      expect(find.text("Password"), findsNWidgets(2));
    });
  });

  // Check Dashboard page

  group("Dashboard page : ", () {
    test('dashboard.dart file', () {
      expect(Dashboard, isNotNull);
    });
  });

  // Check Settings page

  group("Settings page : ", () {
    test('settings.dart file', () {
      expect(Settings, isNotNull);
    });
  });

  // Check global

  group("Global : ", () {
    test('global.dart file', () {
      expect(global.email, isEmpty);
      expect(global.password, isEmpty);
      expect(global.isLoggedIn, isFalse);
    });
  });
}
