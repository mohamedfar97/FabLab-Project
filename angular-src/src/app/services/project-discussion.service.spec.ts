import { TestBed, inject } from '@angular/core/testing';

import { ProjectDiscussionService } from './project-discussion.service';

describe('ProjectDiscussionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectDiscussionService]
    });
  });

  it('should be created', inject([ProjectDiscussionService], (service: ProjectDiscussionService) => {
    expect(service).toBeTruthy();
  }));
});
