/*!
 * @license
 * Alfresco Example Content Application
 *
 * Copyright (C) 2005 - 2020 Alfresco Software Limited
 *
 * This file is part of the Alfresco Example Content Application.
 * If the software was purchased under a paid Alfresco license, the terms of
 * the paid license agreement will prevail.  Otherwise, the software is
 * provided under the following open source license terms:
 *
 * The Alfresco Example Content Application is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Alfresco Example Content Application is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

import { LoginPage, BrowsingPage } from '../../pages/pages';
import { SelectTemplateDialog } from '../../components/dialog/select-template-dialog';
import { CreateFromTemplateDialog } from '../../components/dialog/create-from-template-dialog';
import { Utils } from '../../utilities/utils';
import { AdminActions } from '../../utilities/admin-actions';
import { RepoClient, NodeContentTree } from '../../utilities/repo-client/repo-client';

describe('Create folder from template', () => {
  const random = Utils.random();

  const username = `user-${random}`;

  const restrictedTemplateFolder = `restricted-folder-${random}`;
  const fileInRestrictedFolder = `restricted-file-${random}.txt`;

  const templateFolder1 = `template-folder1-${random}`;
  const fileInFolder1 = `file-1-${random}.txt`;

  const templateFolder2 = `template-folder2-${random}`;
  const fileInFolder2 = `file-2-${random}.txt`;
  const templateSubFolder = `template-sub-folder-${random}`;

  const fileInRootFolder = `file-in-root-${random}.txt`;
  const folderInRootFolder = `folder-in-root-${random}`;

  const parent = `parent-${random}`;
  let parentId: string;

  const folder1 = {
    name: `folder1-${random}`
  };
  const folder2 = {
    name: `folder2-${random}`,
    title: `folder2 title`,
    description: `folder2 description`
  };
  const duplicateFolderName = `duplicate-folder-${random}`;
  const nameWithSpaces = `  folder-${random}  `;

  const siteName = `site-${random}`;
  const folderSite = {
    name: `folder-site-${random}`,
    title: `folder site title`,
    description: `folder site description`
  };
  const duplicateFolderSite = `duplicate-folder-site-${random}`;
  let docLibUserSite: string;

  const templates: NodeContentTree = {
    folders: [
      {
        name: folderInRootFolder
      },
      {
        name: templateFolder1,
        files: [fileInFolder1]
      },
      {
        name: templateFolder2,
        folders: [
          {
            name: templateSubFolder
          }
        ],
        files: [fileInFolder2]
      },
      {
        name: restrictedTemplateFolder,
        files: [fileInRestrictedFolder]
      }
    ],
    files: [fileInRootFolder]
  };
  let folderLink: string;

  const userApi = new RepoClient(username, username);
  const adminApiActions = new AdminActions();

  const loginPage = new LoginPage();
  const page = new BrowsingPage();
  const selectTemplateDialog = new SelectTemplateDialog();
  const createFromTemplateDialog = new CreateFromTemplateDialog();
  const { sidenav } = page;

  beforeAll(async () => {
    await adminApiActions.createUser({ username });

    parentId = (await userApi.nodes.createFolder(parent)).entry.id;
    await userApi.nodes.createFolder(duplicateFolderName, parentId);

    await userApi.sites.createSite(siteName);
    docLibUserSite = await userApi.sites.getDocLibId(siteName);
    await userApi.nodes.createFolder(duplicateFolderSite, docLibUserSite);

    await adminApiActions.createSpaceTemplatesHierarchy(templates);
    await adminApiActions.removeUserAccessOnSpaceTemplate(restrictedTemplateFolder);
    folderLink = (await adminApiActions.createLinkToFolderName(folderInRootFolder, await adminApiActions.getSpaceTemplatesFolderId())).entry.name;

    await loginPage.loginWith(username);
  });

  afterAll(async () => {
    await userApi.nodes.deleteNodeById(parentId);
    await userApi.sites.deleteSite(siteName);
    await adminApiActions.cleanupSpaceTemplatesFolder();
  });

  beforeEach(async () => {
    await page.closeOpenDialogs();
  });

  describe('Select Template dialog', () => {
    beforeEach(async () => {
      await sidenav.openCreateFolderFromTemplateDialog();
      await selectTemplateDialog.waitForDialogToOpen();
    });

    it('Select template - dialog UI - with existing templates - [C325147]', async () => {
      expect(await selectTemplateDialog.getTitle()).toEqual('Select a folder template');
      expect(await selectTemplateDialog.dataTable.isEmpty()).toBe(false, 'Datatable is empty');
      expect(await selectTemplateDialog.dataTable.isItemPresent(templateFolder1)).toBe(true, 'template folder not displayed');
      expect(await selectTemplateDialog.dataTable.isItemPresent(templateFolder2)).toBe(true, 'template folder not displayed');
      expect(await selectTemplateDialog.dataTable.isItemPresent(fileInRootFolder)).toBe(true, 'file not displayed');
      expect(await selectTemplateDialog.breadcrumb.getCurrentFolderName()).toEqual('Space Templates');
      expect(await selectTemplateDialog.isNextButtonEnabled()).toBe(false, 'Next button is not disabled');
      expect(await selectTemplateDialog.isCancelButtonEnabled()).toBe(true, 'Cancel button is not enabled');
    });

    it(`Templates don't appear if user doesn't have permissions to see them - [C325148]`, async () => {
      expect(await selectTemplateDialog.dataTable.isItemPresent(restrictedTemplateFolder)).toBe(false, 'restricted template folder is displayed');
    });

    it('Navigate through the templates list with folder hierarchy - [C325149]', async () => {
      expect(await selectTemplateDialog.dataTable.isItemPresent(templateFolder2)).toBe(true, 'template folder not displayed');

      await selectTemplateDialog.dataTable.doubleClickOnRowByName(templateFolder2);

      expect(await selectTemplateDialog.dataTable.isItemPresent(templateSubFolder)).toBe(true, 'template sub-folder not displayed');
      expect(await selectTemplateDialog.dataTable.isItemPresent(fileInFolder2)).toBe(true, 'template not displayed');
      expect(await selectTemplateDialog.dataTable.isItemPresent(templateFolder1)).toBe(false, 'template folder is displayed');
      expect(await selectTemplateDialog.breadcrumb.getCurrentFolderName()).toEqual(templateFolder2);

      await selectTemplateDialog.dataTable.doubleClickOnRowByName(templateSubFolder);

      expect(await selectTemplateDialog.breadcrumb.getCurrentFolderName()).toEqual(templateSubFolder);
      expect(await selectTemplateDialog.dataTable.isEmpty()).toBe(true, 'datatable is not empty');

      await selectTemplateDialog.breadcrumb.openPath();

      expect(await selectTemplateDialog.breadcrumb.getPathItems()).toEqual([ templateFolder2, 'Space Templates' ]);
    });

    it(`Templates list doesn't allow multiple selection - [C325150]`, async () => {
      expect(await selectTemplateDialog.dataTable.getSelectedRowsCount()).toEqual(0, 'Incorrect number of selected rows');

      await selectTemplateDialog.dataTable.selectItem(templateFolder1);
      expect(await selectTemplateDialog.dataTable.getSelectedRowsCount()).toEqual(1, 'Incorrect number of selected rows');
      expect(await selectTemplateDialog.dataTable.getSelectedRowsNames()).toEqual([ templateFolder1 ], 'Incorrect selected item');

      await Utils.pressCmd();
      await selectTemplateDialog.dataTable.selectItem(templateFolder2);
      await Utils.releaseKeyPressed();

      expect(await selectTemplateDialog.dataTable.getSelectedRowsCount()).toEqual(1, 'Incorrect number of selected rows');
      expect(await selectTemplateDialog.dataTable.getSelectedRowsNames()).toEqual([ templateFolder2 ], 'Incorrect selected item');
    });

    it('Links to folders are not displayed - [C325153]', async () => {
      expect(await selectTemplateDialog.dataTable.isItemPresent(folderLink)).toBe(false, 'Link to folder is displayed');
    });

    it('Cancel the Select template dialog - [C325151]', async () => {
      expect(await selectTemplateDialog.isCancelButtonEnabled()).toBe(true, 'Cancel button is not enabled');

      await selectTemplateDialog.clickCancel();

      expect(await selectTemplateDialog.isDialogOpen()).toBe(false, 'Select Template dialog is open');
    });

    it('Next button is disabled when selecting a file - [C325139]', async () => {
      expect(await selectTemplateDialog.isNextButtonEnabled()).toBe(false, 'Next button is enabled');

      await selectTemplateDialog.dataTable.selectItem(fileInRootFolder);

      expect(await selectTemplateDialog.isNextButtonEnabled()).toBe(false, 'Next button is enabled');
    });
  });

  describe('Create from template dialog', () => {
    beforeEach(async () => {
      await sidenav.openCreateFolderFromTemplateDialog();
      await selectTemplateDialog.waitForDialogToOpen();
      await selectTemplateDialog.dataTable.selectItem(templateFolder1);
      await selectTemplateDialog.clickNext();
      await createFromTemplateDialog.waitForDialogToOpen();
    });

    it('Create folder from template - dialog UI - [C325142]', async () => {
      expect(await createFromTemplateDialog.getTitle()).toEqual(`Create new folder from '${templateFolder1}'`);
      expect(await createFromTemplateDialog.isNameFieldDisplayed()).toBe(true, 'Name field not displayed');
      expect(await createFromTemplateDialog.isTitleFieldDisplayed()).toBe(true, 'Title field not displayed');
      expect(await createFromTemplateDialog.isDescriptionFieldDisplayed()).toBe(true, 'Description field not displayed');
      expect(await createFromTemplateDialog.isCancelButtonEnabled()).toBe(true, 'Cancel button is not enabled');
      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(true, 'Create button is not enabled');
    });

    it('Folder name is required - [C325143]', async () => {
      expect(await createFromTemplateDialog.getName()).toEqual(templateFolder1);
      await createFromTemplateDialog.deleteNameWithBackspace();

      expect(await createFromTemplateDialog.getValidationMessage()).toEqual('Name is required');
      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
    });

    it('Special characters in folder name - [C325144]', async () => {
      const namesWithSpecialChars = [ 'a*a', 'a"a', 'a<a', 'a>a', `a\\a`, 'a/a', 'a?a', 'a:a', 'a|a' ];

      for (const name of namesWithSpecialChars) {
        await createFromTemplateDialog.enterName(name);
        expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
        expect(await createFromTemplateDialog.getValidationMessage()).toContain(`Name can't contain these characters`);
      }
    });

    it('Folder name ending with a dot - [C325145]', async () => {
      await createFromTemplateDialog.enterName('folder-name.');

      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
      expect(await createFromTemplateDialog.getValidationMessage()).toMatch(`Name can't end with a period .`);
    });

    it('Folder name containing only spaces - [C325146]', async () => {
      await createFromTemplateDialog.enterName('    ');

      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
      expect(await createFromTemplateDialog.getValidationMessage()).toMatch(`Name can't contain only spaces`);
    });

    it('Title too long - [C325141]', async () => {
      await createFromTemplateDialog.enterTitle(Utils.string257);
      await Utils.pressTab();

      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
      expect(await createFromTemplateDialog.getValidationMessage()).toMatch(`Use 256 characters or less for title`);
    });

    it('Description too long - [C325140]', async () => {
      await createFromTemplateDialog.enterDescription(Utils.string513);
      await Utils.pressTab();

      expect(await createFromTemplateDialog.isCreateButtonEnabled()).toBe(false, 'Create button is not disabled');
      expect(await createFromTemplateDialog.getValidationMessage()).toMatch(`Use 512 characters or less for description`);
    });
  });

  describe('On Personal Files', () => {
    beforeEach(async () => {
      await page.clickPersonalFilesAndWait();
      await page.dataTable.doubleClickOnRowByName(parent);
      await sidenav.openCreateFolderFromTemplateDialog();
      await selectTemplateDialog.waitForDialogToOpen();
      await selectTemplateDialog.dataTable.selectItem(templateFolder1);
      await selectTemplateDialog.clickNext();
      await createFromTemplateDialog.waitForDialogToOpen();
    });

    it('Create a folder from a template - with a new Name - [C325157]', async () => {
      await createFromTemplateDialog.enterName(folder1.name);
      await createFromTemplateDialog.clickCreate();
      await createFromTemplateDialog.waitForDialogToClose();
      await page.dataTable.waitForHeader();

      expect(await page.dataTable.isItemPresent(folder1.name)).toBe(true, 'Folder not displayed in list view');
    });

    it('Create a folder from a template - with a Name, Title and Description - [C325154]', async () => {
      await createFromTemplateDialog.enterName(folder2.name);
      await createFromTemplateDialog.enterTitle(folder2.title);
      await createFromTemplateDialog.enterDescription(folder2.description);
      await createFromTemplateDialog.clickCreate();
      await createFromTemplateDialog.waitForDialogToClose();
      await page.dataTable.waitForHeader();

      expect(await page.dataTable.isItemPresent(folder2.name)).toBe(true, 'Folder not displayed in list view');
      const desc = await userApi.nodes.getNodeDescription(folder2.name, parentId);
      expect(desc).toEqual(folder2.description);
      const title = await userApi.nodes.getNodeTitle(folder2.name, parentId);
      expect(title).toEqual(folder2.title);
    });

    it('Create a folder with a duplicate name - [C325156]', async () => {
      await createFromTemplateDialog.enterName(duplicateFolderName);
      await createFromTemplateDialog.clickCreate();

      expect(await page.getSnackBarMessage()).toEqual(`This name is already in use, try a different name.`);
      expect(await createFromTemplateDialog.isDialogOpen()).toBe(true, 'dialog is not present');
    });

    it('Cancel folder creation - [C325155]', async () => {
      await createFromTemplateDialog.enterName('test');
      await createFromTemplateDialog.clickCancel();

      expect(await createFromTemplateDialog.isDialogOpen()).not.toBe(true, 'dialog is not closed');
      expect(await page.dataTable.isItemPresent('test')).toBe(false, 'Folder should not appear in the list');
    });

    it('Trim spaces from folder Name - [C325158]', async () => {
      await createFromTemplateDialog.enterName(nameWithSpaces);
      await createFromTemplateDialog.clickCreate();
      await createFromTemplateDialog.waitForDialogToClose();
      await page.dataTable.waitForHeader();

      expect(await page.dataTable.isItemPresent(nameWithSpaces.trim())).toBe(true, 'Folder not displayed in list view');
    });
  });

  describe('On File Libraries', () => {
    const fileLibrariesPage = new BrowsingPage();

    beforeEach(async () => {
      await fileLibrariesPage.goToMyLibrariesAndWait();
      await page.dataTable.doubleClickOnRowByName(siteName);
      await sidenav.openCreateFolderFromTemplateDialog();
      await selectTemplateDialog.waitForDialogToOpen();
      await selectTemplateDialog.dataTable.selectItem(templateFolder1);
      await selectTemplateDialog.clickNext();
      await createFromTemplateDialog.waitForDialogToOpen();
    });

    it('Create a folder from a template - with Name, Title and Description - [C325161]', async () => {
      await createFromTemplateDialog.enterName(folderSite.name);
      await createFromTemplateDialog.enterTitle(folderSite.title);
      await createFromTemplateDialog.enterDescription(folderSite.description);
      await createFromTemplateDialog.clickCreate();
      await createFromTemplateDialog.waitForDialogToClose();
      await page.dataTable.waitForHeader();

      expect(await page.dataTable.isItemPresent(folderSite.name)).toBe(true, 'Folder not displayed in list view');
      const desc = await userApi.nodes.getNodeDescription(folderSite.name, docLibUserSite);
      expect(desc).toEqual(folderSite.description);
      const title = await userApi.nodes.getNodeTitle(folderSite.name, docLibUserSite);
      expect(title).toEqual(folderSite.title);
    });

    it('Cancel folder creation - [C325162]', async () => {
      await createFromTemplateDialog.enterName('test');
      await createFromTemplateDialog.clickCancel();

      expect(await createFromTemplateDialog.isDialogOpen()).not.toBe(true, 'dialog is not closed');
      expect(await page.dataTable.isItemPresent('test')).toBe(false, 'Folder should not appear in the list');
    });

    it('Create a folder with a duplicate name - [C325163]', async () => {
      await createFromTemplateDialog.enterName(duplicateFolderSite);
      await createFromTemplateDialog.clickCreate();

      expect(await page.getSnackBarMessage()).toEqual(`This name is already in use, try a different name.`);
      expect(await createFromTemplateDialog.isDialogOpen()).toBe(true, 'dialog is not present');
    });
  });

});
