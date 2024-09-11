import * as core from "@alloy-js/core";
import * as coretest from "@alloy-js/core/testing";
import { expect, it } from "vitest";
import * as csharp from "../src/index.js";

it("defines a project directory file with multiple source files", () => {
  const res = core.render(
    <core.Output>
      <csharp.ProjectDirectory name="TestProject" version="0.1.0" description="a test project">
        <csharp.Namespace name='TestCode'>
          <csharp.SourceFile path="Test1.cs">
            <csharp.Class accessModifier='public' name="TestClass1" />
          </csharp.SourceFile>
          <csharp.SourceFile path="Test2.cs">
            <csharp.Class accessModifier='public' name="TestClass2" />
          </csharp.SourceFile>
        </csharp.Namespace>
      </csharp.ProjectDirectory>
    </core.Output>,
  );

  expect(res.contents[0].path).equals("TestProject.csproj");
  expect(res.contents[0].contents).toBe(coretest.d`
    <Project Sdk="Microsoft.NET.Sdk">
      <PropertyGroup>
        <Version>0.1.0</Version>
        <Description>a test project</Description>
      </PropertyGroup>
    </Project>
  `);

  const src = res.contents[1] as core.OutputDirectory;

  expect(src.contents[0].path).equals("src/Test1.cs");
  expect(src.contents[0].contents).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass1;
    }
  `);

  expect(src.contents[1].path).equals("src/Test2.cs");
  expect(src.contents[1].contents).toBe(coretest.d`
    namespace TestCode
    {
      public class TestClass2;
    }
  `);
});